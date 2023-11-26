import { useRouter } from 'next/router';
import { wrapper } from '../redux/store';
import { getRunningQueriesThunk, searchByValue } from '../redux/reducers/api';
import Search from '../components/Search';
import ResultList from '../components/ResultList';
import Pagination from '../components/Pagination';
import ItemsPerPage from '../components/ItemsPerPage';
import Details from '../components/Details';
import ErrorPage from './404';
import Spinner from '../components/Spinner';
import { apiResponse } from '../interfaces/interfaces';
import { updateQueryParams } from '../functions/updateQueryParams';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const pageNumber = Number(context.query.page) - 1 || 0;
    const pageSize = Number(context.query.limit) || 10;
    const searchValue = context.query.search?.toString() || '';
    const details = context.query.details?.toString() || '';

    const response = await store.dispatch(
      searchByValue.initiate({
        pageNumber,
        pageSize,
        searchValue,
      }),
    );

    const detailsResponse = details
      ? await store.dispatch(
          searchByValue.initiate({
            pageNumber: 0,
            pageSize: 1,
            searchValue: details,
          }),
        )
      : null;

    const paginationButtonsValue =
      pageNumber && pageNumber > 2
        ? [1, 2, 3].map((_, ind) => pageNumber + ind - 1)
        : [1, 2, 3];

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { response, searchValue, detailsResponse, paginationButtonsValue },
    };
  },
);

interface Props {
  response: apiResponse;
  detailsResponse: apiResponse | null;
  searchValue: string;
  paginationButtonsValue: number[];
  isLoading: boolean;
}

export default function MainPage({
  response,
  searchValue,
  detailsResponse,
  paginationButtonsValue,
}: Props) {
  const router = useRouter();

  if (response.error) {
    return <ErrorPage />;
  }

  const { pageNumber, totalPages, pageSize } = response.data.page;
  const searchResults = response.data.animals;
  const detailsData = detailsResponse?.data.animals[0];

  return (
    <div className="container">
      <Search searchValue={searchValue} />

      {typeof window !== 'undefined' && router.isReady && !response && (
        <Spinner />
      )}

      {totalPages && (
        <Pagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          paginationButtonsValue={paginationButtonsValue}
        />
      )}
      <ItemsPerPage pageSize={pageSize} />
      <ResultList searchResults={searchResults} />

      <div>
        {router.query.details && (
          <div
            onClick={() => {
              const newParams = updateQueryParams(router.query, 'details', '');
              router.push(newParams.toString() ? '?' + newParams : '');
            }}
          >
            {detailsResponse === null && <Spinner />}

            {detailsResponse?.error || !detailsData ? (
              <div>There is an error</div>
            ) : (
              <Details detailsData={detailsData} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
