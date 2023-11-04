import React from 'react';
import { ResultListProps } from '../interfaces/interfaces';
import Spinner from './Spinner';
import Pagination from './Pagination';
import LikeIcon from '../icons/likeIcon';

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
                  alt={result.firstName}
                />
                <div className="result-list-item-text-content">
                  <h3 className="result-list-item-name">{result.title}</h3>
                  <div className="result-list-item-likes">
                    <LikeIcon />
                    <p className="number-of=likes">{result.likes}</p>
                  </div>
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
