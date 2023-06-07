'use client';

import axios from '@/lib/common/axios';
import useUser from '@/lib/hooks/useUser';
import Link from 'next/link';
import { ComponentProps, ComponentType } from 'react';
import Skeleton from '../common/Skeleton';

const Navbar: ComponentType<ComponentProps<'nav'>> = ({ ...rest }) => {
  const { data: user, mutate, isLoading } = useUser();

  const onLogout = () => {
    axios
      .post('/logout')
      .then(() => mutate())
      .finally(() => (window.location.href = '/auth/login'));
  };

  if (!user) return null;

  return (
    <nav {...rest} className="p-4 shadow mb-4">
      <div className="container mx-auto flex flex-col gap-2">
        <section className="flex justify-end">
          {isLoading ? <Skeleton className="h-6 w-16 max-w-xs" /> : `Welcome, ${user?.name}`}
        </section>

        <section className="flex flex-wrap items-center">
          <Link href="/home" className="btn btn-ghost">
            Home
          </Link>
          <Link href="/for-you" className="btn btn-ghost">
            For You
          </Link>
          <div className="mx-auto"></div>
          <Link href="/personalize-for-you" className="btn btn-ghost">
            Personalize For You
          </Link>
          <button onClick={onLogout} className="btn btn-ghost">
            Logout
          </button>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
