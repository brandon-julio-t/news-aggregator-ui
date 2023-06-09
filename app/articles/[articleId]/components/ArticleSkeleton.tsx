import Skeleton from '@/components/common/Skeleton';
import React from 'react';

const ArticleSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <Skeleton className="h-6 max-w-xs" />
        <Skeleton className="h-6 max-w-xs" />
      </section>

      <section className="flex flex-col gap-2">
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
      </section>

      <section className="flex flex-col gap-2">
        <Skeleton className="h-6 max-w-xs" />
        <Skeleton className="h-6 max-w-xs" />
      </section>
    </div>
  );
};

export default ArticleSkeleton;
