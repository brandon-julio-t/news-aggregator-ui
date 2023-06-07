import useSWR from 'swr';
import { ComponentProps, ComponentType, useEffect, useRef } from 'react';
import { UseFormRegister,UseFormWatch } from 'react-hook-form';
import { IFilterForm } from './Filter';
import axios from '@/lib/common/axios';

interface IFilterCategory {
  register: UseFormRegister<IFilterForm>;
  watch: UseFormWatch<IFilterForm>;
  isSubmitting: boolean;
}

const FilterCategory: ComponentType<ComponentProps<'section'> & IFilterCategory> = ({
  register,
  watch,
  isSubmitting,
  ...rest
}) => {
  const submitBtn = useRef<HTMLButtonElement | null>(null);

  const { data, isLoading } = useSWR('/api/articles/categories', path => axios.get<string[]>(path).then(r => r.data));

  const c = watch("category");
  useEffect(() => {
    submitBtn.current?.click();
  }, [c]);

  return (
    <section className="form-control w-full" {...rest}>
      <select
        {...register('category')}
        className={`select select-bordered w-full ${isLoading && 'animate-pulse'}`}
        disabled={isLoading}
      >
        <option value="">All categories</option>
        {data?.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button ref={submitBtn} type="submit" className="hidden"></button>
    </section>
  );
};

export default FilterCategory;
