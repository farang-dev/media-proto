'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { HeroGallery } from './HeroGallery';

function FloatingParticle({ index }: { index: number }) {
  const size = 3 + (index % 3) * 2;
  const x = 10 + (index * 17) % 80;
  const y = 10 + (index * 13) % 80;
  const duration = 6 + (index % 4) * 3;
  const delay = (index % 5) * 1.2;

  return (
    <motion.div
      className="absolute rounded-full bg-neon-violet/10"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
      }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

export const HeroSection: React.FC = () => {
  const particles = Array.from({ length: 12 });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full"
          style={{ background: 'radial-gradient(circle, #A370F7 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, #E0A96D 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut', delay: 4 }}
          className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full"
          style={{ background: 'radial-gradient(circle, #E0A96D 0%, transparent 70%)' }}
        />

        {particles.map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>

      {/* Brand watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-5">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-[18vw] sm:text-[14vw] font-black font-serif text-foreground/[0.04] tracking-tight leading-none"
        >
          OshiHost
        </motion.span>
      </div>

      {/* Card gallery */}
      <div className="w-full flex-1 flex flex-col items-center justify-center gap-8 relative z-10">
        <HeroGallery />
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-zinc-600 cursor-pointer z-20"
        onClick={() => document.getElementById('clubs')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
};
