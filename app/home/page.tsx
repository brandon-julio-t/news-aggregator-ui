'use client';

import Card from '@/components/common/Card';
import Articles from './components/Articles';
import Filter from './components/Filters/Filter';

const HomePage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <section className="flex-1">
        <Card>
          <Filter />
        </Card>
      </section>

      <section className="flex-[3]">
        <Card>
          <h1 className="my-2 text-2xl font-bold">Explore Articles</h1>

          <Articles baseApiPath="/api/articles" />
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
