'use client';

import React from 'react';
import { Input } from '@/src/components/ui/atoms/input-field';
import { Button } from '@/src/components/ui/atoms/button';

export interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordFormProps {
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  email: string;
  onEmailChange: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit, loading, email, onEmailChange }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Input label="Email" type="email" value={email} onChange={e => onEmailChange(e.target.value)} required />

      <Button
        type="submit"
        className="w-full py-5 text-xl bg-gray-900 rounded-2xl hover:bg-gray-800 transition-all"
        loading={loading}
        loadingText="Sending reset link...">
        Send Reset Link
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
