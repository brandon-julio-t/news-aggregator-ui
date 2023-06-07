import React, { ComponentProps, ComponentType } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IFilterForm } from './Filter';

interface IFilterKeyword {
  register: UseFormRegister<IFilterForm>;
  isSubmitting: boolean;
}

const FilterKeyword: ComponentType<ComponentProps<'section'> & IFilterKeyword> = ({
  register,
  isSubmitting,
  ...rest
}) => {
  return (
    <section className="form-control w-full" {...rest}>
      <div className="input-group">
        <input
          {...register('q')}
          type="text"
          placeholder="Search by keyword..."
          className="input input-bordered w-full"
          disabled={isSubmitting}
        />

        <button type="submit" className="btn btn-primary btn-square" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
};

export default FilterKeyword;
