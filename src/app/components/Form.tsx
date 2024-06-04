'use client';

import { useUser } from '@/store/user';
import { useEffect, useState } from 'react';

export function Form({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const setUserData = useUser((state) => state.setUserData);

  const handleChangeUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setUserData(userInfo.email, userInfo.password);
  }, [userInfo, setUserData]);

  return (
    <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Email Address
        </label>
        <input
          value={userInfo.email}
          onChange={handleChangeUserData}
          id="email"
          name="email"
          type="email"
          placeholder="user@acme.com"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          Password
        </label>
        <input
          value={userInfo.password}
          onChange={handleChangeUserData}
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      {children}
    </div>
  );
}
