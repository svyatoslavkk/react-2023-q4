import React from 'react';
import { useRouter } from 'next/router';
import { updateQueryParams } from '../functions/updateQueryParams';
import { Character } from '../interfaces/interfaces';

function Details(props: Record<'detailsData', Character>) {
  const { detailsData } = props;
  const router = useRouter();

  return (
    <div className="details" data-testid="details">
      <button
        data-testid="cross"
        onClick={() => {
          const newParams = updateQueryParams(router.query, 'details', '');
          router.push(newParams.toString() ? '?' + newParams : '');
        }}
      >
        Close Details
      </button>
      <div>
        <h1 className="details-name" data-testid="details-h1">
          {detailsData.name}
        </h1>
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
    </div>
  );
}

export default Details;
