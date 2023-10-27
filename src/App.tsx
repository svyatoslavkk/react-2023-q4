import { Component } from 'react';
import { Character } from './interfaces/interfaces';
import './App.css';
import Search from './components/Search';
import ResultList from './components/ResultList';

interface AppState {
  searchResults: Character[];
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchResults: [],
    };
  }

  updateResults = (results: Character[]) => {
    this.setState({ searchResults: results });
  };

  render() {
    return (
      <div>
        <Search updateResults={this.updateResults} />
        <ResultList results={this.state.searchResults} />
      </div>
    );
  }
}

export default App;
