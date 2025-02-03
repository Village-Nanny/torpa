'use client';

import React from 'react';
import { Input } from '@/src/components/ui/atoms/input-field';
import { DatePicker } from '@/src/components/ui/molecules/date-picker';
import { Button } from '@/src/components/ui/atoms/button';
import { Select } from '@/src/components/ui/molecules/select-field';

export interface FormData {
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhoneNumber: string;
  childFirstName: string;
  childDateOfBirth: Date | null;
  childGender: 'male' | 'female' | 'other';
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  parentFirstName?: string;
  parentLastName?: string;
  parentEmail?: string;
  parentPhoneNumber?: string;
  childFirstName?: string;
  childDateOfBirth?: string;
  childGender?: string;
  password?: string;
  confirmPassword?: string;
}

interface RegistrationFormProps {
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  errors: FormErrors;
  formData: FormData;
  onFieldChange: (name: keyof FormData, value: string) => void;
  onDateChange: (date: Date | null) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  loading,
  errors,
  formData,
  onFieldChange,
  onDateChange,
}) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {/* Parent Information */}
      <Input
        label="Parent First Name"
        name="parentFirstName"
        value={formData.parentFirstName}
        onChange={e => onFieldChange('parentFirstName', e.target.value)}
        error={errors.parentFirstName}
        required
      />

      <Input
        label="Parent Last Name"
        name="parentLastName"
        value={formData.parentLastName}
        onChange={e => onFieldChange('parentLastName', e.target.value)}
        error={errors.parentLastName}
        required
      />

      <Input
        label="Parent Email"
        name="parentEmail"
        type="email"
        value={formData.parentEmail}
        onChange={e => onFieldChange('parentEmail', e.target.value)}
        error={errors.parentEmail}
        required
      />

      <Input
        label="Parent Phone Number"
        name="parentPhoneNumber"
        type="tel"
        value={formData.parentPhoneNumber}
        onChange={e => onFieldChange('parentPhoneNumber', e.target.value)}
        error={errors.parentPhoneNumber}
        required
      />

      {/* Child Information */}

      <Input
        label="Child's First Name"
        name="childFirstName"
        value={formData.childFirstName}
        onChange={e => onFieldChange('childFirstName', e.target.value)}
        error={errors.childFirstName}
        required
      />

      <DatePicker
        label="Child's Birth Date"
        value={formData.childDateOfBirth}
        onChange={onDateChange}
        error={errors.childDateOfBirth}
      />

      <div className="space-y-2">
        <Select
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
          value={formData.childGender}
          onChange={value => onFieldChange('childGender', value)}
          onFocus={() => {}}
          onBlur={() => {}}
          placeholder="Select gender"
          error={!!errors.childGender}
        />
        {errors.childGender && <p className="mt-1.5 text-xs text-red-500 pl-1">{errors.childGender}</p>}
      </div>

      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={e => onFieldChange('password', e.target.value)}
        error={errors.password}
        required
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={e => onFieldChange('confirmPassword', e.target.value)}
        error={errors.confirmPassword}
        required
      />

      <Button
        type="submit"
        className="w-full py-5 text-xl bg-gray-900 rounded-2xl hover:bg-gray-800 transition-all"
        loading={loading}
        loadingText="Creating Account...">
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;
