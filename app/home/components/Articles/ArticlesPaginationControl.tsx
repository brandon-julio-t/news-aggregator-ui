import Article from '@/lib/contracts/Article';
import PaginationResponse from '@/lib/contracts/PaginationResponse';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ComponentProps, ComponentType } from 'react';

interface IArticlesPaginationControl {
  pagination: PaginationResponse<Article>;
}

const ArticlesPaginationControl: ComponentType<ComponentProps<'section'> & IArticlesPaginationControl> = ({
  pagination,
  ...rest
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onPaginationNav = (pageDelta: -1 | 1) => {
    const nextPage = pagination.current_page + pageDelta;
    const clone = new URLSearchParams([...searchParams]);
    clone.set('page', nextPage.toString());
    router.push(`${pathname}?${clone}`);
  };

  return (
    <section className="justify-end flex my-4" {...rest}>
      <div className="join">
        <button className="join-item btn" onClick={() => onPaginationNav(-1)} disabled={pagination.current_page <= 1}>
          «
        </button>
        <button className="join-item btn">
          {pagination.current_page} / {pagination.last_page}
        </button>
        <button
          className="join-item btn"
          onClick={() => onPaginationNav(+1)}
          disabled={pagination.current_page >= pagination.last_page}
        >
          »
        </button>
      </div>
    </section>
  );
};

export default ArticlesPaginationControl;
