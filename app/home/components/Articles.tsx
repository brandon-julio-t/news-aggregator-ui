import Skeleton from '@/components/common/Skeleton';
import axios from '@/lib/common/axios';
import Article from '@/lib/contracts/Article';
import PaginationResponse from '@/lib/contracts/PaginationResponse';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ComponentType } from 'react';
import useSWR from 'swr';
import ArticlesTable from './Articles/ArticlesTable';
import ArticlesPaginationControl from './Articles/ArticlesPaginationControl';

const Articles: ComponentType = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data } = useSWR(`/api/articles?${searchParams}`, path =>
    axios.get<PaginationResponse<Article>>(path).then(r => r.data)
  );

  const onPaginationNav = (pageDelta: -1 | 1) => {
    const nextPage = (data?.current_page ?? 1) + pageDelta;
    const clone = new URLSearchParams([...searchParams]);
    clone.set('page', nextPage.toString());
    router.push(`${pathname}?${clone}`);
  };

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
