import React from 'react';
import { useMainContext } from '../context/MainContext';
import { ResultListProps } from '../interfaces/interfaces';
import Spinner from './Spinner';
import Pagination from './Pagination';

const ResultList: React.FC<ResultListProps> = (props) => {
  const { currentPage, totalPages, navigate } = props;
  const { allCharacters } = useMainContext();

  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        navigate={navigate}
      />
      <div className="result-list">
        {props.loading ? (
          <Spinner />
        ) : (
          <ul className="fetching-results">
            {allCharacters.map((result, index) => (
              <li
                className="result-list-item"
                key={index}
                onClick={() => props.onItemSelect(result)}
              >
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
