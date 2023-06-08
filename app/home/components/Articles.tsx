import Skeleton from '@/components/common/Skeleton';
import axios from '@/lib/common/axios';
import Article from '@/lib/contracts/Article';
import PaginationResponse from '@/lib/contracts/PaginationResponse';
import { useSearchParams } from 'next/navigation';
import { ComponentType, useEffect } from 'react';
import useSWR, { preload } from 'swr';
import ArticlesPaginationControl from './Articles/ArticlesPaginationControl';
import ArticlesTable from './Articles/ArticlesTable';
import { toast } from 'react-hot-toast';

const Articles: ComponentType = () => {
  const searchParams = useSearchParams();

  const key = `/api/articles?${searchParams}`;
  const fetcher = (path: string) => axios.get<PaginationResponse<Article>>(path).then(r => r.data);

  const { data, error } = useSWR(key, fetcher);

  useEffect(() => {
    const currentPage = Number(searchParams.get('page'));
    const nextPage = (isNaN(currentPage) ? 1 : currentPage) + 1;
    const clone = new URLSearchParams([...searchParams.entries()]);
    clone.set('page', nextPage.toString());
    preload(`/api/articles?${clone}`, fetcher);
  }, [searchParams]);

  if (error) {
    toast.error(error, { id: key });
  }

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
