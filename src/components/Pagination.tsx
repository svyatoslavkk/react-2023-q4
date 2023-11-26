import React from 'react';
import { useRouter } from 'next/router';
import { updateQueryParams } from '../functions/updateQueryParams';
import { PaginationProps } from '../interfaces/interfaces';

function Pagination(props: PaginationProps) {
  const { pageNumber, totalPages, paginationButtonsValue } = props;

  const router = useRouter();

  return (
    <ul className="pagination" data-testid="pagination">
      <li className="prev">
        <button
          onClick={() => {
            if (pageNumber <= 0) return;
            router.push(
              '?' +
                updateQueryParams(router.query, 'page', pageNumber.toString()),
            );
          }}
        >
          Prev
        </button>
      </li>

      {paginationButtonsValue.map(
        (value, ind) =>
          totalPages > value && (
            <button
              data-testid={`page-${ind + 1}-button`}
              key={`button-${value}`}
              style={{
                backgroundColor: pageNumber + 1 === value ? 'orange' : '',
              }}
              onClick={() => {
                router.push(
                  '?' +
                    updateQueryParams(router.query, 'page', value.toString()),
                );
              }}
            >
              {value}
            </button>
          ),
      )}

      <li className="next">
        <button
          onClick={() => {
            if (pageNumber + 1 > totalPages - 1) return;
            router.push(
              '?' +
                updateQueryParams(
                  router.query,
                  'page',
                  (pageNumber + 2).toString(),
                ),
            );
          }}
        >
          Next
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
