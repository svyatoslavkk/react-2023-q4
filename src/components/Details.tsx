import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import Spinner from './Spinner';
import { useSearchByValueMutation } from '../redux/reducers/api';
import { setLoadingStatus } from '../redux/reducers/loaderSlice';
import { setDetailsData, setDetailsName } from '../redux/reducers/detailsSlice';
import { updateQueryParams } from '../functions/updateQueryParams';

function Details() {
  const [params, setParams] = useSearchParams();
  const { detailsName, detailsData } = useSelector(
    (state: RootState) => state.details,
  );

  const detailsLoader = useSelector(
    (state: RootState) => state.loader.detailsLoader,
  );

  const dispatch = useDispatch();

  const [getDetails, { data, isLoading, isSuccess }] =
    useSearchByValueMutation();

  const handleDetailsClose = () => {
    dispatch(setDetailsName(''));
    setParams(updateQueryParams(params, 'details', ''));
  };

  useEffect(() => {
    if (detailsName && isLoading) {
      dispatch(setLoadingStatus({ loader: 'details', value: true }));
    }
    if (detailsName && isSuccess) {
      dispatch(setDetailsData(data?.animals[0]));
      dispatch(setLoadingStatus({ loader: 'details', value: false }));
    }
  }, [isLoading, isSuccess, detailsName, dispatch, data?.animals]);

  useEffect(() => {
    async function getData() {
      await getDetails({
        pageNumber: 0,
        pageSize: 1000,
        searchValue: detailsName,
      });
    }
    if (detailsName) getData();
  }, [detailsName, getDetails]);

  return params.has('details') ? (
    <div className="details">
      <button onClick={handleDetailsClose}>Close Details</button>
      {detailsLoader ? (
        <Spinner />
      ) : (
        <div>
          <h2 className="details-name">{detailsData.name}</h2>
          <div className="rest-data">
            <p>
              Avian:{' '}
              {detailsData.avian ? (
                <span className="yes">Yes</span>
              ) : (
                <span className="no">No</span>
              )}
            </p>
            <p>
              Canine:{' '}
              {detailsData.canine ? (
                <span className="yes">Yes</span>
              ) : (
                <span className="no">No</span>
              )}
            </p>
            <p>
              Earth Animal:{' '}
              {detailsData.earthAnimal ? (
                <span className="yes">Yes</span>
              ) : (
                <span className="no">No</span>
              )}
            </p>
            <p>
              Earth Insect:{' '}
              {detailsData.earthInsect ? (
                <span className="yes">Yes</span>
              ) : (
                <span className="no">No</span>
              )}
            </p>
            <p>
              Feline:{' '}
              {detailsData.feline ? (
                <span className="yes">Yes</span>
              ) : (
                <span className="no">No</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}

export default Details;
