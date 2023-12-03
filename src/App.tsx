import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import HookFormPage from './pages/HookFormPage';
import MainPage from './pages/MainPage';
import UncontrolledFormPage from './pages/UncontrolledFormPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />} />
      <Route path="/hook-form" element={<HookFormPage />} />
      <Route path="/uncontrolled-form" element={<UncontrolledFormPage />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
