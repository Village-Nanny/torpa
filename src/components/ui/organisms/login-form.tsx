'use client';

import React from 'react';
import { Input } from '@/src/components/ui/atoms/input-field';
import { Button } from '@/src/components/ui/atoms/button';
import Link from 'next/link';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  errors: LoginFormErrors;
  formData: LoginFormData;
  onFieldChange: (name: keyof LoginFormData, value: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, errors, formData, onFieldChange }) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={e => onFieldChange('email', e.target.value)}
        error={errors.email}
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={e => onFieldChange('password', e.target.value)}
        error={errors.password}
        required
      />

      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-green-600">
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full py-5 text-xl bg-gray-900 rounded-2xl hover:bg-gray-800 transition-all"
        loading={loading}
        loadingText="Signing in...">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
