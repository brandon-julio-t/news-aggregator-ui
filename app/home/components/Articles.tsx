import Skeleton from '@/components/common/Skeleton';
import axios from '@/lib/common/axios';
import Article from '@/lib/contracts/Article';
import PaginationResponse from '@/lib/contracts/PaginationResponse';
import { useSearchParams } from 'next/navigation';
import { ComponentType } from 'react';
import useSWR from 'swr';
import ArticlesPaginationControl from './Articles/ArticlesPaginationControl';
import ArticlesTable from './Articles/ArticlesTable';

const Articles: ComponentType = () => {
  const searchParams = useSearchParams();

  const { data } = useSWR(`/api/articles?${searchParams}`, path =>
    axios.get<PaginationResponse<Article>>(path).then(r => r.data)
  );

  return (
    <>
      {!data && (
        <>
          <section className="flex justify-end mt-4">
            <Skeleton className="h-12 w-32" />
          </section>
          <Skeleton className="h-96 w-full" />
          <section className="flex justify-end mt-4">
            <Skeleton className="h-12 w-32" />
          </section>
        </>
      )}

      {data && (
        <>
          <ArticlesPaginationControl pagination={data} />
          <ArticlesTable articles={data.data} />
          <ArticlesPaginationControl pagination={data} />
        </>
      )}
    </>
  );
};

export default Articles;
