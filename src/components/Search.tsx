import React, { useState, useEffect } from 'react';
import { Character, SearchComponentProps } from '../interfaces/interfaces';
import ErrorComponent from './ErrorComponent';

const Search: React.FC<SearchComponentProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    setSearchTerm(savedSearchTerm);
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);

      props.onSearchInputChange(searchTerm);

      const response = await fetch(
        `https://dummyapi.io/data/v1/post?tags=${searchTerm}`,
        {
          headers: {
            'app-id': '6545494498239d80ad063841',
          },
        },
      );

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const results: Character[] = data.data.map((result: Character) => ({
        id: result.id,
        firstName: result.owner.firstName,
        image: result.image,
      }));

      props.updateResults(results, props.currentPage, props.totalPages);
      setLoading(false);
      localStorage.setItem('searchTerm', searchTerm);
    } catch (error) {
      console.error('Error when making an API request: ', error);
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleThrowError = () => {
    throwError();
  };

  const throwError = () => {
    console.error('Simulated error:', new Error('Simulated error'));
    setError(new Error('Simulated error'));
  };

  const handleResetError = () => {
    setError(null);
  };

  if (error) {
    return <ErrorComponent onReload={handleResetError} />;
  }

  return (
    <div className="search-component">
      <div className="input-content">
        <input
          type="text"
          className="form-field"
          placeholder="Enter character name"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="button-container">
          <button
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            Search
          </button>
          <button className="error-button" onClick={handleThrowError}>
            Throw an Error
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
