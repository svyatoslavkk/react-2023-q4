import { Component } from 'react';
import {
  Character,
  SearchComponentProps,
  SearchComponentState,
} from '../interfaces/interfaces';

export class Search extends Component<
  SearchComponentProps,
  SearchComponentState
> {
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

    if (!searchTerm) {
      fetch(`https://rickandmortyapi.com/api/character/`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const results: Character[] = data.results.map(
            (result: Character) => ({
              id: result.id,
              name: result.name,
              status: result.status,
              species: result.species,
              image: result.image,
            })
          );

          this.props.updateResults(results);
          this.setState({ loading: false });
        })
        .catch((error) => {
          console.error('Error when making an API request: ', error);
          this.setState({ loading: false });
        });
    } else {
      fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const results: Character[] = data.results.map(
            (result: Character) => ({
              id: result.id,
              name: result.name,
              status: result.status,
              species: result.species,
              image: result.image,
            })
          );
          this.props.updateResults(results);
          this.setState({ loading: false });
          localStorage.setItem('searchTerm', searchTerm);
        })
        .catch((error) => {
          console.error('Error when making an API request: ', error);
          this.setState({ loading: false });
        });
    }
  };
}
