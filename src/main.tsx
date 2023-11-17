import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store.ts';
import App from './App.tsx';
import Details from './components/Details.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: `/`,
    element: <App />,
    children: [
      {
        path: '/character/:id',
        element: <Details />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>,
);
