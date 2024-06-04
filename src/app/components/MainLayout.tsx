'use client';

import { FC, ReactNode } from 'react';
import Navbar from '../navbar';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname !== '/register' && pathname !== '/login' ? (
        <div>
          <Toaster position='top-right'/>
          <Navbar />
          {children}
        </div>
      ) : (
        <>
          <Toaster position='top-right'/>
          {children}
        </>
      )}
    </>
  );
};

export default MainLayout;
