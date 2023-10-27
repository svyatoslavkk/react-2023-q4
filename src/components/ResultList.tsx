import { Component } from 'react';
import { ResultListProps } from '../interfaces/interfaces';

export class ResultList extends Component<ResultListProps> {
  render() {
    return (
      <div className="result-list">
        <h2 className="result-list-title">Search Results:</h2>
        <ul className="fetching-results">
          {this.props.results.map((result, index) => (
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
      </div>
    );
  }
}
