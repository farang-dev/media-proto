#!/bin/bash
# Daily Google Indexing API requester for oshi-hos.xyz
# Runs at 10:00 JST daily via cron
# Uses 5 service accounts in round-robin (200 req/day each = 1000 total)

cd "$(dirname "$0")/.."
source .venv/bin/activate

LOG_DIR="data"
mkdir -p "$LOG_DIR"

DATE=$(date +%Y-%m-%d)
LOG_FILE="$LOG_DIR/index-log-${DATE}.txt"

echo "=== Google Indexing Run: $(date) ===" >> "$LOG_FILE"
python3 scripts/google-index.py >> "$LOG_FILE" 2>&1
echo "" >> "$LOG_FILE"
