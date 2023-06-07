'use client';

import useUser from '@/lib/hooks/useUser';
import { ComponentProps, ComponentType } from 'react';
import Skeleton from '../common/Skeleton';

const Navbar: ComponentType<ComponentProps<'nav'>> = ({ ...rest }) => {
  const { data: user, isLoading } = useUser();

  if (!user) return null;

  return (
    <nav {...rest} className="p-4 shadow mb-4">
      <div className="flex justify-end container mx-auto">
        <section>{isLoading ? <Skeleton className="h-6 w-16 max-w-xs" /> : `Welcome, ${user?.name}`}</section>
      </div>
    </nav>
  );
};

export default Navbar;
