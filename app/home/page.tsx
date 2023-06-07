'use client';

import useUser from '@/lib/hooks/useUser';
import React from 'react';

const HomePage = () => {
  useUser();
  return <div>HomePage</div>;
};

export default HomePage;
