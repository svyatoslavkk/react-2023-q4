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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFilterChange = (
    results: Character[],
    page: number,
    pages: number,
  ) => {
    setSearchResults(results);
    setCurrentPage(page);
    setTotalPages(pages);
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
    setCurrentPage(1);
    loadData(searchTerm);
  };

  async function loadData(searchTerm: string) {
    try {
      setLoading(true);
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
      console.log(data);
      const results: Character[] = data.data.map((result: Character) => ({
        id: result.id,
        title: result.text,
        firstName: result.owner.firstName,
        image: result.image,
        likes: result.likes,
      }));
      const pages = data.totalPages;

      handleFilterChange(results, currentPage, pages);
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
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <ResultList
          loading={loading}
          results={searchResults}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
