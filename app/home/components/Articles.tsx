import Skeleton from '@/components/common/Skeleton';
import axios from '@/lib/common/axios';
import Article from '@/lib/contracts/Article';
import PaginationResponse from '@/lib/contracts/PaginationResponse';
import { useSearchParams } from 'next/navigation';
import { ComponentProps, ComponentType, useEffect } from 'react';
import useSWR, { preload } from 'swr';
import ArticlesPaginationControl from './Articles/ArticlesPaginationControl';
import ArticlesTable from './Articles/ArticlesTable';
import { toast } from 'react-hot-toast';

interface IArticle {
  baseApiPath: string;
}

const Articles: ComponentType<ComponentProps<'div'> & IArticle> = ({ baseApiPath, ...rest }) => {
  const searchParams = useSearchParams();

  const key = `${baseApiPath}?${searchParams}`;
  const fetcher = (path: string) => axios.get<PaginationResponse<Article>>(path).then(r => r.data);

  const { data, error } = useSWR(key, fetcher);

  useEffect(() => {
    const currentPage = Number(searchParams.get('page'));
    const nextPage = (isNaN(currentPage) ? 1 : currentPage) + 1;
    const clone = new URLSearchParams([...searchParams.entries()]);
    clone.set('page', nextPage.toString());
    preload(`${baseApiPath}?${clone}`, fetcher);
  }, [baseApiPath, searchParams]);

  if (error) {
    toast.error(error, { id: key });
  }

  return (
    <div className="flex flex-col gap-4" {...rest}>
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
          <ArticlesTable pagination={data} />
          <ArticlesPaginationControl pagination={data} />
        </>
      )}
    </div>
  );
};

export default Articles;
