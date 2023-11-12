import { ReactNode } from 'react';

export interface Character {
  id: number;
  name: string;
  gender: string;
  location: {
    name: string;
  };
  title: string;
  text: string;
  status: string;
  species: string;
  image: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  navigate: (path: string) => void;
}

export interface DetailsProps {
  selectedCharacter: Character | null;
  onCloseDetails: () => void;
}

export interface SearchComponentProps extends PaginationProps {
  updateResults: (
    results: Character[],
    currentPage: number,
    totalPages: number,
  ) => void;
  onSearchInputChange: (searchTerm: string) => void;
  navigate: (path: string) => void;
}

export interface SearchComponentState {
  searchTerm: string;
  loading: boolean;
  error: Error | null;
}

export interface ResultListProps extends PaginationProps {
  results: Character[];
  loading: boolean;
  onItemSelect: (character: Character) => void;
  showDetails: boolean;
}

export interface AppState {
  searchTerm: string;
  searchResults: Character[];
  loading: boolean;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface ErrorComponentProps {
  onReload: () => void;
}

export interface MainContextProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  allCharacters: Character[];
  setAllCharacters: (value: Character[]) => void;
}

export interface MainProviderProps {
  children: ReactNode;
}
