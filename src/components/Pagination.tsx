import { useNavigate } from 'react-router-dom';
import { PaginationProps } from '../interfaces/interfaces';

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
      {pages.map((page) => (
        <li key={page} className={page === currentPage ? 'active' : ''}>
          <button onClick={() => handlePageChange(page)}>{page}</button>
        </li>
      ))}
    </ul>
  );
}
