import { PaginationProps } from '../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      {currentPage > 1 && (
        <li className="prev">
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Prev
          </button>
        </li>
      )}
      {pages.map((page) => (
        <li key={page} className={page === currentPage ? 'active' : ''}>
          <button onClick={() => handlePageChange(page)}>{page}</button>
        </li>
      ))}
      {currentPage < totalPages && (
        <li className="next">
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      )}
    </ul>
  );
}
