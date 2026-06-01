import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import type { BlogArticle } from '@/data/blog';

export function BlogLayout({
  article,
  relatedArticles,
  children,
}: {
  article: BlogArticle;
  relatedArticles: BlogArticle[];
  children: React.ReactNode;
}) {
  return (
    <article className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-accent transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to guides
          </Link>
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">
            {article.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-black font-serif text-white leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-zinc-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
            <span>{article.date}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 flex items-center gap-1"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="prose prose-invert prose-rose max-w-none
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-serif [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4
          [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3
          [&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-4
          [&_ul]:text-zinc-300 [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul]:pl-5
          [&_ol]:text-zinc-300 [&_ol]:space-y-2 [&_ol]:mb-6 [&_ol]:pl-5
          [&_li]:leading-relaxed
          [&_strong]:text-foreground [&_strong]:font-semibold
          [&_a]:text-accent [&_a]:hover:underline
          [&_hr]:border-card-border [&_hr]:my-10
          [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:bg-card-bg [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:rounded-r-xl [&_blockquote]:my-6
          [&_blockquote_p]:text-zinc-300 [&_blockquote_p]:italic
          [&_.table-wrap]:overflow-x-auto [&_.table-wrap]:mb-8
          [&_table]:w-full [&_table]:text-sm [&_table]:text-zinc-300 [&_table]:border-collapse
          [&_th]:bg-card-bg [&_th]:text-foreground [&_th]:font-semibold [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:border [&_th]:border-card-border
          [&_td]:px-4 [&_td]:py-3 [&_td]:border [&_td]:border-card-border [&_td]:align-top
          [&_.tip-box]:bg-card-bg [&_.tip-box]:border [&_.tip-box]:border-accent/30 [&_.tip-box]:rounded-xl [&_.tip-box]:p-5 [&_.tip-box]:my-6
          [&_.tip-box_p]:text-zinc-300 [&_.tip-box_p]:mb-0
          [&_.warning-box]:bg-card-bg [&_.warning-box]:border [&_.warning-box]:border-yellow-600/30 [&_.warning-box]:rounded-xl [&_.warning-box]:p-5 [&_.warning-box]:my-6
          [&_.warning-box_p]:text-zinc-300 [&_.warning-box_p]:mb-0
        ">
          {children}
        </div>

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} />
      </div>
    </article>
  );
}

function RelatedArticles({ articles }: { articles: BlogArticle[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-card-border">
      <h2 className="text-2xl font-bold font-serif text-foreground mb-6">
        Related Guides
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}`}
            className="block rounded-2xl bg-card-bg border border-card-border hover:border-accent/30 transition-all p-5"
          >
            <p className="text-[10px] font-semibold text-accent uppercase tracking-widest mb-1">
              {a.category}
            </p>
            <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
              {a.title}
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
              {a.description}
            </p>
            <div className="flex items-center gap-3 mt-3 text-[10px] text-zinc-600">
              <span>{a.readingTime}</span>
              <span>{a.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
