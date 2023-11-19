import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import './App.css';
import Details from './components/Details';
import { ErrorBoundary } from './components/ErrorBoundary';
import ErrorComponent from './components/ErrorComponent';
import MainPage from './components/MainPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <MainPage />
          </ErrorBoundary>
        }
      >
        <Route index element={<Details />} />
      </Route>
      <Route
        path="*"
        element={<ErrorComponent onReload={() => window.location.reload()} />}
      />
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
