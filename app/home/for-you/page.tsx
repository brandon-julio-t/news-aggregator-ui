'use client';

import Skeleton from '@/components/common/Skeleton';
import axios from '@/lib/common/axios';
import Article from '@/lib/contracts/Article';
import PaginationResponse from '@/lib/contracts/PaginationResponse';
import useSWR from 'swr';
import ArticlesPaginationControl from '../components/Articles/ArticlesPaginationControl';
import ArticlesTable from '../components/Articles/ArticlesTable';

const ForYouPage = () => {
  const { data } = useSWR('/api/articles/for-you', path =>
    axios.get<PaginationResponse<Article>>(path).then(r => r.data)
  );

  return (
    <>
      <h1 className="my-2 text-2xl font-bold">For You</h1>

      <p>Enhance For You page by exploring articles and like the author/category/source.</p>

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

export default ForYouPage;
