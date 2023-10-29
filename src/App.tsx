import { Component } from 'react';
import './App.css';
import { Character } from './interfaces/interfaces';
import Search from './components/Search';
import ResultList from './components/ResultList';

interface AppState {
  searchTerm: string;
  searchResults: Character[];
  loading: boolean;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      loading: false,
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

  async loadData(searchTerm: string) {
    try {
      this.setState({ loading: true });
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

      this.handleFilterChange(results);
      this.setState({ loading: false });
    } catch (error) {
      console.error('Error when making an API request: ', error);
      this.setState({ loading: false });
      throw error;
    }
  }

  render() {
    return (
      <div className="container">
        <Search
          updateResults={this.handleFilterChange}
          searchTerm={this.state.searchTerm}
          onSearchInputChange={this.handleSearchInputChange}
        />
        <ResultList
          loading={this.state.loading}
          results={this.state.searchResults}
          searchTerm={this.state.searchTerm}
        />
      </div>
    );
  }
}

export default App;
