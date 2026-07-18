'use client';

import React, { useState } from 'react';

export default function ImageGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-card-border bg-card-bg">
      <div className="aspect-[3/4] relative">
        <img
          src={images[selected]}
          alt={name}
          className="w-full h-full object-cover object-top host-img"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-1 p-2">
          {images.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={`aspect-square rounded-lg overflow-hidden bg-background transition-all ${
                i === selected
                  ? 'ring-2 ring-accent ring-offset-1 ring-offset-background'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={url} alt="" className="w-full h-full object-cover host-img" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
