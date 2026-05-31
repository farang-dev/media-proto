'use client';

import React from 'react';
import { LanguageProvider } from '../lib/LanguageContext';
import { AuthProvider } from '../lib/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
};
