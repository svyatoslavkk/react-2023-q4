import React, { useState, useEffect } from 'react';
import './App.css';
import { Character } from './interfaces/interfaces';
import Search from './components/Search';
import ResultList from './components/ResultList';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

const App: React.FC<Record<string, never>> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showDetails, setShowDetails] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page') || '1', 10);

  const handleItemClick = (character: Character) => {
    navigate(`/character/${character.id}`);
    setShowDetails(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${page}&per_page=30`,
        );

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        console.log(data);
        const results: Character[] = data.results.map((result: Character) => ({
          id: result.id,
          name: result.name,
          status: result.status,
          species: result.species,
          image: result.image,
        }));

        setAllCharacters(results);
        setCurrentPage(page);

        setLoading(false);
        localStorage.setItem('searchTerm', searchTerm);
      } catch (error) {
        console.error('Ошибка при выполнении API-запроса: ', error);
        setLoading(false);
        throw error;
      }
    }

    fetchData();
  }, [location.search, searchTerm]);

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
        `https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${page}&per_page=10`,
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
      const pages = data.info.pages;

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
      <div className="container main-page">
        <div className="main-content">
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
            allCharacters={allCharacters}
            onItemSelect={handleItemClick}
            showDetails={showDetails}
          />
        </div>
        {showDetails && <Outlet />}
      </div>
    </ErrorBoundary>
  );
};

export default App;
