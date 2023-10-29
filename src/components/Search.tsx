import { ChangeEvent, Component } from 'react';
import {
  Character,
  SearchComponentProps,
  SearchComponentState,
} from '../interfaces/interfaces';

class Search extends Component<SearchComponentProps, SearchComponentState> {
  constructor(props: SearchComponentProps) {
    super(props);
    this.state = {
      searchTerm: '',
      loading: false,
      error: null,
    };
  }

  handleSearch = async () => {
    try {
      const { searchTerm } = this.state;
      this.setState({ loading: true });

      this.props.onSearchInputChange(searchTerm);

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
      this.props.updateResults(results);
      this.setState({ loading: false });
      localStorage.setItem('searchTerm', searchTerm);
    } catch (error) {
      console.error('Error when making an API request: ', error);
      this.setState({ loading: false });
      throw error;
    }
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  componentDidMount() {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm });
  }

  handleThrowError = () => {
    this.throwError();
  };

  throwError() {
    this.setState({ error: new Error('Simulated error') });
  }

  handleResetError = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div className="error-boundary-block">
          <h2 className="error-boundary-title">Something went wrong</h2>
          <button onClick={this.handleResetError}>Reload</button>
        </div>
      );
    }

    return (
      <div className="search-component">
        <div className="input-content">
          <button onClick={this.handleThrowError}>Throw an Error</button>
          <input
            type="text"
            className="form-field"
            placeholder="Enter character name"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
          />
          <button
            className="search-button"
            onClick={this.handleSearch}
            disabled={this.state.loading}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
