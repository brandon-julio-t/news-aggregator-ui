'use client';

import Articles from './components/Articles';
import Filter from './components/Filters/Filter';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Filter />
      <Articles />
    </div>
  );
};

export default HomePage;
