import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setSearchValue } from '../redux/reducers/searchSlice';
import {
  setPageNumber,
  setPaginationButtonsValue,
} from '../redux/reducers/paginationSlice';
import { updateQueryParams } from '../functions/updateQueryParams';
import { SearchComponentProps } from '../interfaces/interfaces';

function Search(props: SearchComponentProps) {
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue,
  );
  const pageNumber = useSelector(
    (state: RootState) => state.pagination.pageNumber,
  );
  const dispatch = useDispatch();
  const inputCurrentValue = useRef(searchValue);

  const { params, setParams } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputCurrentValue.current = e.target.value;
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setSearchValue(inputCurrentValue.current));
    dispatch(setPaginationButtonsValue([1, 2, 3]));
    setParams(updateQueryParams(params, 'search', ''));
    if (pageNumber) dispatch(setPageNumber(0));
  };

  return (
    <div className="search-component">
      <div className="input-content">
        <input
          type="text"
          className="form-field"
          placeholder="Enter character name"
          onChange={handleInputChange}
        />
        <div className="button-container">
          <button className="search-button" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
