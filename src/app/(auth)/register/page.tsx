'use client';

import React, { useState } from 'react';
import { DotPattern } from '@/src/components/ui/atoms/dot-pattern';
import RegistrationForm, { FormData, FormErrors } from '@/src/components/ui/organisms/registration-form';
import { auth, db } from '@/src/services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { UserDocument } from '@/src/types/user';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    parentPhoneNumber: '',
    childFirstName: '',
    childDateOfBirth: null,
    childGender: 'male',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.parentFirstName.trim()) {
      newErrors.parentFirstName = 'Parent First Name is required';
    }

    if (!formData.parentLastName.trim()) {
      newErrors.parentLastName = 'Parent Last Name is required';
    }

    if (!formData.parentEmail.trim()) {
      newErrors.parentEmail = 'Parent Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Please enter a valid email';
    }

    if (!formData.parentPhoneNumber.trim()) {
      newErrors.parentPhoneNumber = 'Parent Phone Number is required';
    }

    if (!formData.childFirstName.trim()) {
      newErrors.childFirstName = "Child's First Name is required";
    }

    if (!formData.childDateOfBirth) {
      newErrors.childDateOfBirth = "Child's birthdate is required";
    }

    if (!formData.childGender) {
      newErrors.childGender = "Child's gender is required";
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('Starting registration process...');

      const userCredential = await createUserWithEmailAndPassword(auth, formData.parentEmail, formData.password);
      console.log('User account created:', userCredential.user.uid);

      const userDoc: UserDocument = {
        uid: userCredential.user.uid,
        parentFirstName: formData.parentFirstName,
        parentLastName: formData.parentLastName,
        parentEmail: formData.parentEmail,
        parentPhoneNumber: formData.parentPhoneNumber,
        childFirstName: formData.childFirstName,
        childDateOfBirth: formData.childDateOfBirth?.toISOString() || '',
        childGender: formData.childGender,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);
      console.log('User document craeted in Firestore');

      router.push('/dashboard');
    } catch (error: any) {
      console.error('Registration failed:', error);
      let errorMessage = 'Registration failed. Please try again.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
      }
      setErrors({ parentEmail: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, childDateOfBirth: date }));
    if (errors.childDateOfBirth) {
      setErrors(prev => ({ ...prev, childDateOfBirth: undefined }));
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-6 overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 z-0">
        <DotPattern className="absolute inset-0 bg-green-600 text-gray-200" />
      </div>
      <div className="absolute inset-0 " />

      <div className="relative w-full max-w-xl">
        <div className="relative bg-gray-100 rounded-3xl shadow-2xl p-12 space-y-10 border border-gray-100">
          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900">Join Torpa</h1>
            <p className="text-lg text-gray-600">Create an account to get started</p>
          </div>

          <RegistrationForm
            onSubmit={handleSubmit}
            loading={loading}
            errors={errors}
            formData={formData}
            onFieldChange={handleFieldChange}
            onDateChange={handleDateChange}
          />

          <p className="text-center text-lg text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-gray-900 hover:underline font-medium text-lg">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
