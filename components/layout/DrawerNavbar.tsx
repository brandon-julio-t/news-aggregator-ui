'use client';

import axios from '@/lib/common/axios';
import useUser from '@/lib/hooks/useUser';
import Link from 'next/link';
import { ComponentProps, ComponentType } from 'react';

const DrawerNavbar: ComponentType<ComponentProps<'nav'>> = ({ children, ...rest }) => {
  const { data: user, mutate } = useUser();

  const onLogout = () => {
    axios
      .post('/logout')
      .then(() => mutate())
      .finally(() => (window.location.href = '/auth/login'));
  };

  if (!user) return children;

  return (
    <nav {...rest} className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-100 shadow mb-4">
          <div className="container mx-auto">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>

            <div className="flex-1 hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <Link href="/home">Home</Link>
                </li>
                <li>
                  <Link href="/home/for-you">For You</Link>
                </li>
              </ul>
            </div>

            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <Link href="/personalize-for-you">Personalize For You</Link>
                </li>
                <li>
                  <button onClick={onLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page content here */}
        {children}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200">
          {/* Sidebar content here */}
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/home/for-you">For You</Link>
          </li>
          <li>
            <Link href="/personalize-for-you">Personalize For You</Link>
          </li>
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DrawerNavbar;
