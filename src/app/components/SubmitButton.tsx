'use client';

import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import to from 'await-to-js';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useUser } from '@/store/user';
import { apiRequest } from '@/infrastructure/api-request';

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  const router = useRouter();
  const { email, password } = useUser((state) => state);

  const handleLogin = async () => {
    const loginProcess = apiRequest.post('/auth/login', {
      email,
      password,
    });

    toast
      .promise(loginProcess, {
        loading: 'Loading...',
        success: 'Login success!',
        error: 'Login failed!',
      })
      .then((response) => {
        router.push('/');
      });
  };

  return (
    <button
      type={pending ? 'button' : 'submit'}
      aria-disabled={pending}
      className="flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
      onClick={handleLogin}
    >
      {children}
      {pending && (
        <svg
          className="animate-spin ml-2 h-4 w-4 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      <span aria-live="polite" className="sr-only" role="status">
        {pending ? 'Loading' : 'Submit form'}
      </span>
    </button>
  );
}
