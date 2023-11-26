import { ReactNode } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

export interface Character {
  id: number;
  name: string;
  avian: boolean;
  canine: boolean;
  earthAnimal: boolean;
  earthInsect: boolean;
  feline: boolean;
}

export interface PaginationProps {
  params: URLSearchParams;
  setParams: SetURLSearchParams;
}

export interface DetailsProps {
  selectedCharacter: Character | null;
  onCloseDetails: () => void;
}

export interface SearchComponentProps {
  params: URLSearchParams;
  setParams: SetURLSearchParams;
}

export interface SearchComponentState {
  searchTerm: string;
  loading: boolean;
  error: Error | null;
}

export interface ResultListProps {
  params: URLSearchParams;
  setParams: SetURLSearchParams;
  searchResults: readonly Character[];
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

export interface URLProps {
  page?: string;
  limit?: string;
  search?: string;
  details?: string;
}
