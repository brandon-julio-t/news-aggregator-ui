import PaginationResponse from '@/lib/contracts/PaginationResponse';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ComponentProps } from 'react';
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';

interface IPaginationControl<T> {
  pagination: PaginationResponse<T>;
}

const PaginationControl = <T extends object>({
  pagination,
  ...rest
}: ComponentProps<'section'> & IPaginationControl<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onNav = (page: number) => {
    const clone = new URLSearchParams([...searchParams]);
    clone.set('page', page.toString());
    router.push(`${pathname}?${clone}`);
  };

  return (
    <section className="justify-end flex my-4" {...rest}>
      <div className="join">
        <button className="join-item btn" onClick={() => onNav(1)} disabled={pagination.current_page <= 1}>
          <ChevronDoubleLeftIcon className="h-5 w-5" />
        </button>
        <button
          className="join-item btn"
          onClick={() => onNav(pagination.current_page - 1)}
          disabled={pagination.current_page <= 1}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <button className="join-item btn">
          {pagination.current_page} / {pagination.last_page}
        </button>

        <button
          className="join-item btn"
          onClick={() => onNav(pagination.current_page + 1)}
          disabled={pagination.current_page >= pagination.last_page}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
        <button
          className="join-item btn"
          onClick={() => onNav(pagination.last_page)}
          disabled={pagination.current_page >= pagination.last_page}
        >
          <ChevronDoubleRightIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default PaginationControl;
