#!/usr/bin/env python3
"""
Daily Google Indexing API requester for oshi-hos.xyz.
Uses 5 service accounts in round-robin (200 req/day each = 1000 total).
Tracks submitted URLs in data/indexed-urls.json to avoid duplicates.
"""

import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build

SITE = "https://www.oshi-hos.xyz"
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
DATA_DIR = PROJECT_DIR / "data"
TRACKING_FILE = DATA_DIR / "indexed-urls.json"
SITEMAP_URL = f"{SITE}/sitemap.xml"

# Load all 5 service accounts
SA_FILES = sorted(PROJECT_DIR.glob("service-account*.json"))
if len(SA_FILES) < 5:
    print(f"Warning: found only {len(SA_FILES)} service accounts, expected 5")

def _load_env():
    """Load .env / .env.local files into os.environ."""
    for name in [".env", ".env.local"]:
        env_file = PROJECT_DIR / name
        if not env_file.exists():
            continue
        for line in env_file.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key, _, value = line.partition("=")
                os.environ.setdefault(key.strip(), value.strip())

_load_env()

SCOPES = ["https://www.googleapis.com/auth/indexing"]

# Free tier: 200 requests per day per service account project
MAX_PER_SA = 200
# 5 SAs × 200 = 1000 per day, use full quota
MAX_PER_RUN = 1000


def load_tracking() -> dict:
    if TRACKING_FILE.exists():
        return json.loads(TRACKING_FILE.read_text())
    return {"indexed": {}, "failed": {}, "last_run": None}


def save_tracking(data: dict):
    DATA_DIR.mkdir(exist_ok=True)
    TRACKING_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False))


def get_credentials(sa_path: Path):
    return service_account.Credentials.from_service_account_file(
        str(sa_path), scopes=SCOPES
    )


def build_service(sa_path: Path):
    creds = get_credentials(sa_path)
    return build("indexing", "v3", credentials=creds)


def fetch_sitemap_urls() -> list[str]:
    """Fetch all indexable URLs from Supabase directly (not dependent on deployed sitemap)."""
    import urllib.request

    SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "https://nimpjswbagkzgfqwyrzv.supabase.co")
    SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

    if not SUPABASE_KEY:
        print("Warning: SUPABASE_SERVICE_ROLE_KEY not set, falling back to live sitemap")
        return _fetch_live_sitemap()

    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }

    urls = [f"{SITE}/"]

    # Static pages
    statics = [
        f"{SITE}/clubs", f"{SITE}/ranking", f"{SITE}/no1-host",
        f"{SITE}/events", f"{SITE}/blog", f"{SITE}/map",
        f"{SITE}/hos-tv", f"{SITE}/hos-match", f"{SITE}/threads", f"{SITE}/terms",
    ]
    urls.extend(statics)

    # Blog articles (hardcoded slugs from data/blog.ts)
    blog_slugs = [
        "host-club-guide-for-foreigners", "host-club-system-and-pricing",
        "host-groups-in-kabukicho", "first-visit-how-to-prepare",
        "host-club-etiquette-and-tips", "faq-about-host-clubs",
        "hosokyaku-meaning", "bakudan-meaning", "hime-culture",
        "customer-types-guide", "dekin-guide", "shimei-nomination-guide",
        "number-one-host", "romance-sales-guide", "champagne-tower-guide",
        "champagne-call-guide", "house-bottle-guide", "dom-perignon-guide",
        "host-club-bottle-guide", "last-song-guide", "going-solo-guide",
        "host-club-dress-code", "how-to-choose-your-host", "conversation-topics",
        "when-to-leave", "second-visit-guide", "event-guide", "group-visit-guide",
        "host-club-myths", "kabukicho-safety-guide", "pillow-business-guide",
        "overspending-guide", "host-addiction-guide", "group-dandy-guide",
        "air-group-guide", "acqua-group-guide", "l-collection-guide",
        "osaka-host-club-guide", "sapporo-host-club-guide", "fukuoka-host-club-guide",
        "host-club-industry-data", "kabukicho-host-history", "host-club-regulation",
        "host-club-psychology", "falling-for-host", "foreigner-host-club-guide",
    ]
    urls.extend(f"{SITE}/blog/{s}" for s in blog_slugs)

    # Dynamic: shops (Kabukicho only)
    try:
        req = urllib.request.Request(
            f"{SUPABASE_URL}/rest/v1/shops?select=id,address_ja&address_ja=not.is.null",
            headers=headers,
        )
        resp = urllib.request.urlopen(req, timeout=30)
        shops = json.loads(resp.read().decode())
        kabukicho_shops = [s for s in shops if "歌舞伎町" in (s.get("address_ja") or "")]
        urls.extend(f"{SITE}/clubs/{s['id']}" for s in kabukicho_shops)
        print(f"Found {len(kabukicho_shops)} Kabukicho shops from Supabase")
    except Exception as e:
        print(f"Warning: could not fetch shops from Supabase: {e}")

    # Dynamic: active hosts
    try:
        req = urllib.request.Request(
            f"{SUPABASE_URL}/rest/v1/hosts?select=id&is_active=eq.true",
            headers=headers,
        )
        resp = urllib.request.urlopen(req, timeout=30)
        hosts = json.loads(resp.read().decode())
        urls.extend(f"{SITE}/hosts/{h['id']}" for h in hosts)
        print(f"Found {len(hosts)} active hosts from Supabase")
    except Exception as e:
        print(f"Warning: could not fetch hosts from Supabase: {e}")

    print(f"Total URLs to index: {len(urls)}")
    return urls


def _fetch_live_sitemap() -> list[str]:
    """Fallback: fetch from live sitemap."""
    import urllib.request
    import xml.etree.ElementTree as ET

    print(f"Fetching sitemap from {SITEMAP_URL} ...")
    try:
        req = urllib.request.Request(SITEMAP_URL, headers={"User-Agent": "OshiHos-Indexer/1.0"})
        resp = urllib.request.urlopen(req, timeout=30)
        xml_data = resp.read().decode()
        root = ET.fromstring(xml_data)
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        urls = [loc.text for loc in root.findall(".//sm:loc", ns) if loc.text]
        print(f"Found {len(urls)} URLs in sitemap")
        return urls
    except Exception as e:
        print(f"Error fetching sitemap: {e}")
        return []


def publish_url(service, url: str) -> bool:
    """Submit a URL for indexing. Returns True on success."""
    body = {"url": url, "type": "URL_UPDATED"}
    try:
        result = service.urlNotifications().publish(body=body).execute()
        return True
    except Exception as e:
        error_str = str(e)
        # Rate limit or quota exceeded — stop this SA for now
        if "429" in error_str or "quota" in error_str.lower() or "rateLimitExceeded" in error_str:
            return None  # signal: quota exhausted for this SA
        print(f"  ERROR for {url}: {e}")
        return False


def main():
    tracking = load_tracking()
    already_indexed = set(tracking["indexed"].keys())
    already_failed = set(tracking["failed"].keys())

    # Get all URLs from sitemap
    all_urls = fetch_sitemap_urls()
    if not all_urls:
        print("No URLs found. Exiting.")
        return

    # Filter: only URLs not yet successfully submitted
    pending = [u for u in all_urls if u not in already_indexed]
    print(f"Total URLs: {len(all_urls)} | Already indexed: {len(already_indexed)} | Pending: {len(pending)}")

    if not pending:
        print("All URLs already submitted. Nothing to do.")
        tracking["last_run"] = datetime.now(timezone.utc).isoformat()
        save_tracking(tracking)
        return

    # Limit per run
    to_submit = pending[:MAX_PER_RUN]
    print(f"Will attempt to submit {len(to_submit)} URLs this run\n")

    # Round-robin through service accounts
    submitted = 0
    failed = 0

    for i, url in enumerate(to_submit):
        sa_index = i % len(SA_FILES)
        sa_path = SA_FILES[sa_index]

        if submitted >= MAX_PER_RUN:
            break

        print(f"[{submitted + 1}/{len(to_submit)}] {url}")
        print(f"  Using SA #{sa_index + 1}: {sa_path.name}")

        try:
            service = build_service(sa_path)
            result = publish_url(service, url)

            if result is None:
                # Quota exhausted for this SA — skip to next
                print(f"  Quota exhausted for SA #{sa_index + 1}, rotating...")
                # Try next SA for remaining URLs
                continue
            elif result:
                print(f"  OK")
                tracking["indexed"][url] = {
                    "submitted_at": datetime.now(timezone.utc).isoformat(),
                    "sa": sa_index + 1,
                }
                submitted += 1
            else:
                print(f"  FAILED")
                tracking["failed"][url] = {
                    "failed_at": datetime.now(timezone.utc).isoformat(),
                    "sa": sa_index + 1,
                }
                failed += 1
        except Exception as e:
            print(f"  EXCEPTION: {e}")
            tracking["failed"][url] = {
                "failed_at": datetime.now(timezone.utc).isoformat(),
                "error": str(e),
            }
            failed += 1

        # Small delay to avoid burst
        time.sleep(0.3)

    tracking["last_run"] = datetime.now(timezone.utc).isoformat()
    save_tracking(tracking)

    print(f"\n--- Summary ---")
    print(f"Submitted: {submitted} | Failed: {failed} | Remaining: {len(pending) - submitted - failed}")
    print(f"Total indexed (all time): {len(tracking['indexed'])}")


if __name__ == "__main__":
    main()
