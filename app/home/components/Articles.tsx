import Skeleton from '@/components/common/Skeleton';
import axios from '@/lib/common/axios';
import Article from '@/lib/contracts/Article';
import PaginationResponse from '@/lib/contracts/PaginationResponse';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ComponentType } from 'react';
import useSWR from 'swr';

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
          <Skeleton className="h-96 w-full" />
          <section className="flex justify-end mt-4">
            <Skeleton className="h-12 w-32" />
          </section>
        </>
      )}

      {data && (
        <>
          <section className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.data.length <= 0 && (
                  <tr>
                    <td colSpan={999} className="text-center">
                      No data
                    </td>
                  </tr>
                )}
                {data.data.length > 0 &&
                  data.data.map((article, index) => (
                    <tr key={article.id}>
                      <th>{index + 1}</th>
                      <td>{article.title}</td>
                      <td>{article.author}</td>
                      <td>
                        <span className="badge badge-primary badge-outline">{article.category}</span>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-2">
                          <button className="btn btn-primary btn-xs">View</button>
                          <button className="btn btn-primary btn-xs">Visit Source</button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                </tr>
              </tfoot>
            </table>
          </section>

          <section className="justify-end flex my-4">
            <div className="join">
              <button className="join-item btn" onClick={() => onPaginationNav(-1)} disabled={data.current_page <= 1}>
                «
              </button>
              <button className="join-item btn">
                {data.current_page} / {data.last_page}
              </button>
              <button
                className="join-item btn"
                onClick={() => onPaginationNav(+1)}
                disabled={data.current_page >= data.total}
              >
                »
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Articles;
