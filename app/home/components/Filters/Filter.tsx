import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ComponentType } from 'react';
import { useForm } from 'react-hook-form';
import FilterKeyword from './FilterKeyword';
import FilterCategory from './FilterCategory';
import FilterDateTimeRange from './FilterDateTimeRange';

export interface IFilterForm {
  q: string;
  category: string;
  from: string;
  to: string;
}

const Filter: ComponentType = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<IFilterForm>({
    defaultValues: {
      q: searchParams.get('q') ?? '',
      category: searchParams.get('category') ?? '',
      from: searchParams.get('from') ?? '',
      to: searchParams.get('to') ?? '',
    },
  });

  const onSubmit = handleSubmit(async data => {
    const clone = new URLSearchParams([...searchParams.entries()]);
    const dateKeys = ['from', 'to'];
    Object.entries(data).forEach(([key, value]) => {
      if (dateKeys.includes(key) && value) {
        clone.set(key, new Date(value).toISOString());
      } else {
        clone.set(key, value);
      }
    });
    router.push(`${pathname}?${clone}`);
  });

  const onReset = () => {
    reset({
      q: '',
      category: '',
      from: '',
      to: '',
    });
    router.push(pathname);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <FilterKeyword {...{ register, isSubmitting }} />
      <FilterCategory {...{ register, watch, isSubmitting }} />
      <FilterDateTimeRange {...{ register, watch, isSubmitting }} />
      <button onClick={onReset} type="button" className="btn btn-outline btn-primary">
        Reset
      </button>
    </form>
  );
};

export default Filter;
