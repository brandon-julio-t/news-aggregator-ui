'use client';

import Articles from './components/Articles';
import Filter from './components/Filters/Filter';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Filter />

      <h1 className="my-2 text-2xl font-bold">Explore Articles</h1>

      <Articles />
    </div>
  );
};

export default HomePage;
