import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen } from 'lucide-react';
import { articles } from '@/data/blog';

export default function BlogIndexPage() {
  const categories = [...new Set(articles.map((a) => a.category))];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black font-serif text-foreground mb-4">
            Guides & Resources
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Everything you need to know about Kabukicho host clubs — written for international visitors.
            From your first visit to understanding the groups, pricing, and culture.
          </p>
        </div>

        {categories.map((category) => {
          const catArticles = articles.filter((a) => a.category === category);
          return (
            <section key={category} className="mb-12">
              <h2 className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {catArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group block rounded-2xl bg-card-bg border border-card-border hover:border-accent/30 transition-all overflow-hidden"
                  >
                    <div className="aspect-[2/1] relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-foreground group-hover:text-accent transition-colors mb-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-3">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-zinc-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readingTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {article.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
