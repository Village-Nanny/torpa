'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import { Header } from '@/src/components/ui/molecules/header';
import { DotPattern } from '@/src/components/ui/atoms/dot-pattern';
import LoginForm, { LoginFormData, LoginFormErrors } from '@/src/components/ui/organisms/login-form';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error);
      let errorMessage = 'Login failed. Please try again.';
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address';
          break;
      }
      setErrors({ email: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (name: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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
            <h1 className="text-5xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-lg text-gray-600">Sign in to continue your journey</p>
          </div>

          <LoginForm
            onSubmit={handleSubmit}
            loading={loading}
            errors={errors}
            formData={formData}
            onFieldChange={handleFieldChange}
          />

          <p className="text-center text-lg text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-gray-900 hover:underline font-medium text-lg">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
