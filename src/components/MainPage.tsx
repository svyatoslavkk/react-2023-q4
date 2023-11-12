import React, { useState, useEffect } from 'react';
import { Character } from '../interfaces/interfaces';
import Search from '../components/Search';
import ResultList from '../components/ResultList';
import { useMainContext } from '../context/MainContext';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { fetchCharacters } from '../services/services';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

const MainPage: React.FC<Record<string, never>> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showDetails, setShowDetails] = useState(false);

  const { searchTerm, setSearchTerm, allCharacters, setAllCharacters } =
    useMainContext();

  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page') || '1', 10);

  const handleItemClick = (character: Character) => {
    navigate(`/character/${character.id}`);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    navigate('/');
    setShowDetails(false);
  };

  useEffect(() => {
    async function fetchDataAndHandle() {
      try {
        setLoading(true);
        const { results } = await fetchCharacters(searchTerm, page, 30);
        setAllCharacters(results);
        setCurrentPage(page);
        setLoading(false);
        localStorage.setItem('searchTerm', searchTerm);
      } catch (error) {
        console.error('Error in fetchDataAndHandle: ', error);
        setLoading(false);
        throw error;
      }
    }

    fetchDataAndHandle();
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
      const { results, pages } = await fetchCharacters(searchTerm, page, 10);
      handleFilterChange(results, currentPage, pages);
      setLoading(false);
      localStorage.setItem('searchTerm', searchTerm);
    } catch (error) {
      console.error('Error in loadData: ', error);
      setLoading(false);
      throw error;
    }
  }

  return (
    <ErrorBoundary>
      <div className={`container main-page ${showDetails ? 'overlay' : ''}`}>
        <div className={`main-content ${showDetails ? 'details' : ''}`}>
          <Search
            updateResults={handleFilterChange}
            onSearchInputChange={handleSearchInputChange}
            currentPage={currentPage}
            totalPages={totalPages}
            navigate={navigate}
          />
          <ResultList
            loading={loading}
            results={searchResults}
            currentPage={currentPage}
            totalPages={totalPages}
            allCharacters={allCharacters}
            onItemSelect={handleItemClick}
            showDetails={showDetails}
            navigate={() => {}}
          />
        </div>
        {showDetails && (
          <div className="overlay" onClick={handleCloseDetails}></div>
        )}
        {showDetails && <Outlet />}
      </div>
    </ErrorBoundary>
  );
};

export default MainPage;
