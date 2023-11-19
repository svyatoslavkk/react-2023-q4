import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
  clickNextPrevButton,
  setPageNumber,
} from '../redux/reducers/paginationSlice';
import { updateQueryParams } from '../functions/updateQueryParams';
import { PaginationProps } from '../interfaces/interfaces';

function Pagination(props: PaginationProps) {
  const { pageNumber, totalPages, paginationButtonsValue } = useSelector(
    (state: RootState) => state.pagination,
  );

  const dispatch = useDispatch();

  const { params, setParams } = props;

  const handlePrevClick = () => {
    dispatch(clickNextPrevButton('prev'));
    setParams(updateQueryParams(params, 'page', pageNumber.toString()));
  };

  const handlePageButtonClick = (value: number) => {
    dispatch(setPageNumber(value - 1));
    setParams(updateQueryParams(params, 'page', value.toString()));
  };

  const handleNextClick = () => {
    dispatch(clickNextPrevButton('next'));
    setParams(updateQueryParams(params, 'page', (pageNumber + 2).toString()));
  };

  return (
    <ul className="pagination">
      <li className="prev">
        {pageNumber > 0 && <button onClick={handlePrevClick}>Prev</button>}
      </li>
      {paginationButtonsValue.map((value) => (
        <button
          key={value}
          style={{ backgroundColor: pageNumber + 1 === value ? 'orange' : '' }}
          onClick={() => handlePageButtonClick(value)}
        >
          {value}
        </button>
      ))}
      <li className="next">
        {pageNumber + 1 < totalPages && (
          <button onClick={handleNextClick}>Next</button>
        )}
      </li>
    </ul>
  );
}

export default Pagination;
