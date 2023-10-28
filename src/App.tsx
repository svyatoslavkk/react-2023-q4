import { Component } from 'react';
import './App.css';
import { Character } from './interfaces/interfaces';
import Search from './components/Search';
import ResultList from './components/ResultList';
import { ErrorBoundary } from './components/ErrorBoundary';

interface AppState {
  searchTerm: string;
  searchResults: Character[];
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
    };
  }

  handleFilterChange = (results: Character[]) => {
    this.setState({ searchResults: results });
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
      this.loadData(savedSearchTerm);
    } else {
      this.loadData(this.state.searchTerm);
    }
  }

  handleSearchInputChange = (searchTerm: string) => {
    this.setState({ searchTerm });
    this.loadData(searchTerm);
  };

  loadData(searchTerm: string) {
    fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        const results: Character[] = data.results.map((result: Character) => ({
          id: result.id,
          name: result.name,
          status: result.status,
          species: result.species,
          image: result.image,
        }));

        this.handleFilterChange(results);
      })
      .catch((error) => {
        console.error('Error when making an API request: ', error);
      });
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="container">
          <Search
            updateResults={this.handleFilterChange}
            searchTerm={this.state.searchTerm}
            onSearchInputChange={this.handleSearchInputChange}
          />
          <ResultList
            results={this.state.searchResults}
            searchTerm={this.state.searchTerm}
          />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
