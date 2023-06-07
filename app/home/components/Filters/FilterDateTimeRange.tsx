import React, { ComponentProps, ComponentType } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IFilterForm } from './Filter';

interface IFilterDateTimeRange {
  register: UseFormRegister<IFilterForm>;
  isSubmitting: boolean;
}

const FilterDateTimeRange: ComponentType<ComponentProps<'section'> & IFilterDateTimeRange> = ({
  register,
  isSubmitting,
  ...rest
}) => {
  return (
    <section className="flex flex-wrap gap-4" {...rest}>
      <div className="flex-1 flex-wrap flex gap-4 items-center">
        <div>From</div>
        <input {...register('from')} type="datetime-local" className="input input-bordered w-full" />
      </div>
      <div className="flex-1 flex-wrap flex gap-4 items-center">
        <div>To</div>
        <input {...register('to')} type="datetime-local" className="input input-bordered w-full" />
      </div>
    </section>
  );
};

export default FilterDateTimeRange;
