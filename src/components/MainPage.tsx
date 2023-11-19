import { useEffect } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateQueryParams } from '../functions/updateQueryParams';
import { useSearchByValueMutation } from '../redux/reducers/api';
import { setTotalPage } from '../redux/reducers/paginationSlice';
import { setSearchResults } from '../redux/reducers/resultsSlice';
import { setLoadingStatus } from '../redux/reducers/loaderSlice';
import Search from './Search';
import ResultList from './ResultList';
import Pagination from './Pagination';
import Spinner from './Spinner';

function MainPage() {
  const [params, setParams] = useSearchParams();
  const { totalPages, pageNumber } = useSelector(
    (state: RootState) => state.pagination,
  );
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue,
  );
  const searchResults = useSelector(
    (state: RootState) => state.results.searchResults,
  );
  const searchLoader = useSelector(
    (state: RootState) => state.loader.searchLoader,
  );

  const dispatch = useDispatch();

  const [getCharacters, { data, isLoading, isSuccess }] =
    useSearchByValueMutation();

  const handleDetailsClick = () => {
    if (params.has('details'))
      setParams(updateQueryParams(params, 'details', ''));
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoadingStatus({ loader: 'search', value: true }));
    }
    if (isSuccess) {
      dispatch(setSearchResults(data?.animals));
      dispatch(setTotalPage(data?.page.totalPages));
      dispatch(setLoadingStatus({ loader: 'search', value: false }));
    }
  }, [isLoading, isSuccess, data?.animals, data?.page.totalPages, dispatch]);

  useEffect(() => {
    async function getData() {
      await getCharacters({ pageNumber, searchValue });
    }
    getData();
  }, [pageNumber, searchValue, getCharacters]);

  return (
    <div className="container">
      <Search params={params} setParams={setParams} />
      {searchLoader && <Spinner />}
      {!searchLoader && (
        <>
          {totalPages && <Pagination params={params} setParams={setParams} />}
          {data && (
            <ResultList
              params={params}
              setParams={setParams}
              searchResults={searchResults}
            />
          )}
        </>
      )}
      {params.has('details') && <div onClick={handleDetailsClick}></div>}
      <Outlet />
    </div>
  );
}

export default MainPage;
