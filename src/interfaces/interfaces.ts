import { ReactNode } from 'react';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface SearchComponentProps {
  updateResults: (results: Character[]) => void;
  searchTerm: string;
  onSearchInputChange: (searchTerm: string) => void;
}

export interface SearchComponentState {
  searchTerm: string;
  loading: boolean;
  error: Error | null;
}

export interface ResultListProps {
  results: Character[];
  searchTerm: string;
  loading: boolean;
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
