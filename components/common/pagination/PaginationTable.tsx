import PaginationResponse from '@/lib/contracts/PaginationResponse';
import { ComponentProps } from 'react';

interface IPaginationTable<T> {
  pagination: PaginationResponse<T>;
  headers: string[];
  render: (data: T, index: number) => JSX.Element;
}

const PaginationTable = <T extends object>({
  pagination,
  headers,
  render,
  ...rest
}: ComponentProps<'section'> & IPaginationTable<T>) => {
  return (
    <section className="overflow-x-auto" {...rest}>
      <table className="table">
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {pagination.data.length <= 0 && (
            <tr>
              <td colSpan={999} className="text-center">
                No data
              </td>
            </tr>
          )}

          {pagination.data.length > 0 && pagination.data.map(render)}
        </tbody>

        <tfoot>
          <tr>
            {headers.map(h => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default PaginationTable;
