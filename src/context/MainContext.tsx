import React, { createContext, useContext, useState } from 'react';
import { MainContextProps, MainProviderProps } from '../interfaces/interfaces';
import { Character } from '../interfaces/interfaces';

export const MainContext = createContext<MainContextProps | undefined>(
  undefined,
);

export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);

  return (
    <MainContext.Provider
      value={{ searchTerm, setSearchTerm, allCharacters, setAllCharacters }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMainContext must be used within a MainProvider');
  }
  return context;
};
