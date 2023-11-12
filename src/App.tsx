import React from 'react';
import './App.css';
import { MainProvider } from './context/MainContext';
import MainPage from './components/MainPage';

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <MainProvider>
        <MainPage />
      </MainProvider>
    </>
  );
};

export default App;
