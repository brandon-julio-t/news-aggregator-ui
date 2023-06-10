import Skeleton from '@/components/common/Skeleton';
import PaginationControl from '@/components/common/pagination/PaginationControl';
import PaginationTable from '@/components/common/pagination/PaginationTable';
import axios from '@/lib/common/axios';
import Article from '@/lib/contracts/Article';
import PaginationResponse from '@/lib/contracts/PaginationResponse';
import { useSearchParams } from 'next/navigation';
import { ComponentProps, ComponentType, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useSWR, { preload } from 'swr';
import ArticleTableRow from './Articles/ArticleTableRow';

interface IArticle {
  baseApiPath: string;
}

const Articles: ComponentType<ComponentProps<'div'> & IArticle> = ({ baseApiPath, ...rest }) => {
  const searchParams = useSearchParams();

  const key = `${baseApiPath}?${searchParams}`;
  const fetcher = (path: string) => axios.get<PaginationResponse<Article>>(path).then(r => r.data);

  const { data, isLoading, error } = useSWR(key, fetcher);

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
      {(isLoading || !data) && (
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

      {!isLoading && data && (
        <>
          <PaginationControl pagination={data} />
          <PaginationTable
            pagination={data}
            headers={['#', 'Title', 'Author', 'Category', 'Published At', '']}
            render={(article, index) => (
              <ArticleTableRow key={article.id} article={article} index={index} pagination={data} />
            )}
          />
          <PaginationControl pagination={data} />
        </>
      )}
    </div>
  );
};

export default Articles;
