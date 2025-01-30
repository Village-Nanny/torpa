'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import { toast } from 'sonner';
import { Header } from '@/src/components/ui/molecules/header';
import { DotPattern } from '@/src/components/ui/atoms/dot-pattern';
import ForgotPasswordForm from '@/src/components/ui/organisms/forgot-password-form';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Check your inbox.');
    } catch {
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex font-sans bg-gray-100 items-center justify-center overflow-hidden">
      <DotPattern className="absolute inset-0 bg-green-600 text-gray-200" />

      <div className="absolute inset-0" />
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-100/80 backdrop-blur-sm">
        <Header />
      </div>

      <div className="relative w-full max-w-form-xl">
        <div className="relative bg-gray-100 rounded-3xl shadow-2xl p-12 space-y-10 border border-gray-100">
          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-lg text-gray-600">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <ForgotPasswordForm onSubmit={handleResetPassword} loading={loading} email={email} onEmailChange={setEmail} />

          <p className="text-center text-lg text-gray-600">
            Remember your password?{' '}
            <Link href="/login" className="text-gray-900 hover:underline font-medium text-lg">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
