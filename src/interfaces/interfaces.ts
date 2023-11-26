import { ReactNode } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export type apiResponse = {
  data: {
    animals: Character[];
    page: {
      firstPage: boolean;
      lastPage: boolean;
      numberOfElements: number;
      pageNumber: number;
      pageSize: number;
      totalElements: number;
      totalPages: number;
    };
    sort?: {
      clauses: [];
    };
  };
  error: FetchBaseQueryError | SerializedError;
  loading: boolean;
};

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
  pageNumber: number;
  totalPages: number;
  paginationButtonsValue: number[];
}

export interface DetailsProps {
  selectedCharacter: Character | null;
  onCloseDetails: () => void;
}

export interface SearchComponentProps {
  params: URLSearchParams;
}

export interface SearchComponentState {
  searchTerm: string;
  loading: boolean;
  error: Error | null;
}

export interface ResultListProps {
  params: URLSearchParams;
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
