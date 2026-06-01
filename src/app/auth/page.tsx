'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '@/lib/auth';


export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const fn = mode === 'login' ? signInWithEmail : signUpWithEmail;
    const { error } = await fn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (mode === 'signup') {
      setMode('login');
      setError('Check your email for a confirmation link.');
      setLoading(false);
    } else {
      router.push('/');
    }
  }

  async function handleGoogle() {
    setError('');
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-foreground">
            {mode === 'login' ? 'Welcome back' : 'Join OshiHost'}
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            {mode === 'login'
              ? 'Sign in to vote and comment'
              : 'Create an account to get started'}
          </p>
        </div>

        <div className="bg-card-bg border border-card-border rounded-2xl p-6">
          {/* Tabs */}
          <div className="flex mb-6 bg-background rounded-lg p-1">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'login'
                  ? 'bg-accent text-background'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'signup'
                  ? 'bg-accent text-background'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-400 mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-background border border-card-border text-foreground placeholder-zinc-500 focus:outline-none focus:border-accent/50 transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-lg bg-background border border-card-border text-foreground placeholder-zinc-500 focus:outline-none focus:border-accent/50 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-accent text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              {loading ? '...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-card-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card-bg px-2 text-zinc-500">or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogle}
            className="w-full py-3 rounded-lg border border-card-border hover:border-zinc-600 text-zinc-300 font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="w-5 h-5 flex items-center justify-center font-bold text-sm">G</span>
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
