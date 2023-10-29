import { ChangeEvent, Component } from 'react';
import {
  Character,
  SearchComponentProps,
  SearchComponentState,
} from '../interfaces/interfaces';
import { ErrorComponent } from './ErrorComponent';

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
    console.error('Simulated error:', new Error('Simulated error'));
    this.setState({ error: new Error('Simulated error') });
  }

  handleResetError = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (error) {
      return <ErrorComponent onReload={this.handleResetError} />;
    }

    return (
      <div className="search-component">
        <div className="input-content">
          <input
            type="text"
            className="form-field"
            placeholder="Enter character name"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
          />
          <div className="button-container">
            <button
              className="search-button"
              onClick={this.handleSearch}
              disabled={this.state.loading}
            >
              Search
            </button>
            <button className="error-button" onClick={this.handleThrowError}>
              Throw an Error
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
