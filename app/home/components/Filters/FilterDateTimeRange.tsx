import { ComponentProps, ComponentType, useEffect, useRef } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { IFilterForm } from './Filter';

interface IFilterDateTimeRange {
  register: UseFormRegister<IFilterForm>;
  watch: UseFormWatch<IFilterForm>;
  isSubmitting: boolean;
}

const FilterDateTimeRange: ComponentType<ComponentProps<'section'> & IFilterDateTimeRange> = ({
  register,
  watch,
  isSubmitting,
  ...rest
}) => {
  const submitBtn = useRef<HTMLButtonElement | null>(null);

  const from = watch('from');
  const to = watch('to');
  useEffect(() => {
    submitBtn.current?.click();
  }, [from, to]);

  return (
    <section className="flex flex-wrap gap-4" {...rest}>
      <div className="flex-1 flex-wrap flex gap-4 items-center">
        <div>From</div>
        <input {...register('from')} type="datetime-local" step={1} className="input input-bordered w-full" />
      </div>
      <div className="flex-1 flex-wrap flex gap-4 items-center">
        <div>To</div>
        <input {...register('to')} type="datetime-local" step={1} className="input input-bordered w-full" />
      </div>

      <button ref={submitBtn} type="submit" className="hidden"></button>
    </section>
  );
};

export default FilterDateTimeRange;
