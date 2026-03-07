'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, KeyRound, AlertCircle, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [pin, setPin] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const pinString = pin.join('');
  const pinComplete = pin.every((d) => d !== '');

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...pin];
    next[index] = value;
    setPin(next);
    // Auto-focus next box
    if (value && index < 3) {
      (document.getElementById(`pin-${index + 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      (document.getElementById(`pin-${index - 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinString, newPassword, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to change password.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/drohol-9x7k/login'), 2500);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-100/60 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-100/60 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/60 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500" />

          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-4">
                <KeyRound size={28} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reset Password</h1>
              <p className="text-gray-500 text-sm mt-1 text-center">Enter your 4-digit secret PIN to continue</p>
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle size={36} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-lg">Password changed!</p>
                    <p className="text-gray-500 text-sm mt-1">Redirecting you to login…</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                  {/* PIN boxes */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 text-center">Secret PIN</label>
                    <div className="flex justify-center gap-3">
                      {pin.map((digit, i) => (
                        <input
                          key={i}
                          id={`pin-${i}`}
                          type="password"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handlePinChange(i, e.target.value)}
                          onKeyDown={(e) => handlePinKeyDown(i, e)}
                          className={`w-14 h-14 text-center text-2xl font-bold rounded-xl border transition-all duration-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:scale-105 ${
                            digit
                              ? 'border-cyan-500 focus:ring-cyan-500/30 bg-cyan-50'
                              : 'border-gray-300 focus:ring-cyan-500/30 focus:border-cyan-500'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* New password */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showNew ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                        placeholder="Min. 6 characters"
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-12 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Repeat new password"
                        className={`w-full bg-gray-50 border rounded-xl pl-10 pr-12 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                          confirmPassword && confirmPassword !== newPassword
                            ? 'border-red-400 focus:ring-red-400/30'
                            : 'border-gray-300 focus:ring-cyan-500/40 focus:border-cyan-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {confirmPassword && newPassword && confirmPassword !== newPassword && (
                      <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                    )}
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm"
                      >
                        <AlertCircle size={16} className="flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={loading || !pinComplete || !newPassword || !confirmPassword}
                    className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><Loader2 size={17} className="animate-spin" /> Updating…</>
                    ) : (
                      'Update Password'
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <a href="/drohol-9x7k/login" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm transition-colors">
            <ArrowLeft size={14} /> Back to login
          </a>
        </div>
      </motion.div>
    </div>
  );
}
