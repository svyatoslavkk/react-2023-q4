import { ReactNode } from 'react';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export interface SearchComponentProps extends PaginationProps {
  updateResults: (
    results: Character[],
    currentPage: number,
    totalPages: number,
  ) => void;
  onSearchInputChange: (searchTerm: string) => void;
}

export interface SearchComponentState {
  searchTerm: string;
  loading: boolean;
  error: Error | null;
}

export interface ResultListProps extends PaginationProps {
  results: Character[];
  loading: boolean;
  allCharacters: Character[];
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
