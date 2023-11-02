import React, { useState, useEffect } from 'react';
import './App.css';
import { Character } from './interfaces/interfaces';
import Search from './components/Search';
import ResultList from './components/ResultList';
import { ErrorBoundary } from './components/ErrorBoundary';

const App: React.FC<Record<string, never>> = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (results: Character[]) => {
    setSearchResults(results);
  };

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      loadData(savedSearchTerm);
    } else {
      loadData(searchTerm);
    }
  }, []);

  const handleSearchInputChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    loadData(searchTerm);
  };

  async function loadData(searchTerm: string) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchTerm}`,
      );

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const results: Character[] = data.results.map((result: Character) => ({
        id: result.id,
        name: result.name,
        status: result.status,
        species: result.species,
        image: result.image,
      }));

      handleFilterChange(results);
      setLoading(false);
      localStorage.setItem('searchTerm', searchTerm);
    } catch (error) {
      console.error('Ошибка при выполнении API-запроса: ', error);
      setLoading(false);
      throw error;
    }
  }

  return (
    <ErrorBoundary>
      <div className="container">
        <Search
          updateResults={handleFilterChange}
          onSearchInputChange={handleSearchInputChange}
        />
        <ResultList loading={loading} results={searchResults} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
