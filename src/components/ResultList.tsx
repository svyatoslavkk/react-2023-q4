import React from 'react';
import { ResultListProps } from '../interfaces/interfaces';
import Spinner from './Spinner';
import Pagination from './Pagination';

const ResultList: React.FC<ResultListProps> = (props) => {
  const { currentPage, totalPages } = props;

  return (
    <>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
      <div className="result-list">
        {props.loading ? (
          <Spinner />
        ) : (
          <ul className="fetching-results">
            {props.results.map((result, index) => (
              <li className="result-list-item" key={index}>
                <img
                  className="result-list-item-image"
                  src={result.image}
                  alt="Character Image"
                />
                <div className="result-list-item-text-content">
                  <h3 className="result-list-item-name">{result.name}</h3>
                  <p className="result-list-item-species">{result.species}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ResultList;
