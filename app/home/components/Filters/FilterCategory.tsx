import useSWR from 'swr';
import { ComponentProps, ComponentType } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IFilterForm } from './Filter';
import axios from '@/lib/common/axios';

interface IFilterCategory {
  register: UseFormRegister<IFilterForm>;
  isSubmitting: boolean;
}

const FilterCategory: ComponentType<ComponentProps<'section'> & IFilterCategory> = ({
  register,
  isSubmitting,
  ...rest
}) => {
  const { data, isLoading } = useSWR('/api/articles/categories', path => axios.get<string[]>(path).then(r => r.data));

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
    </section>
  );
};

export default FilterCategory;
