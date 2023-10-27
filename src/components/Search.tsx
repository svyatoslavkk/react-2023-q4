import { ChangeEvent, Component } from 'react';
import {
  Character,
  SearchComponentProps,
  SearchComponentState,
} from '../interfaces/interfaces';
import Spinner from './Spinner';

class Search extends Component<SearchComponentProps, SearchComponentState> {
  constructor(props: SearchComponentProps) {
    super(props);
    this.state = {
      searchTerm: '',
      loading: false,
    };
  }

  handleSearch = () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });

    this.props.onSearchInputChange(searchTerm);

    fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
      })
      .catch((error) => {
        console.error('Error when making an API request: ', error);
        this.setState({ loading: false });
      });
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  componentDidMount() {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm });
  }

  render() {
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
          <button
            className="search-button"
            onClick={this.handleSearch}
            disabled={this.state.loading}
          >
            Search
          </button>
        </div>
        {this.state.loading && <Spinner />}
      </div>
    );
  }
}

export default Search;
