import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  MemoryRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import MainPage from '../components/MainPage';
import Details from '../components/Details';

describe('Tests for the Detailed Card component', () => {
  const routes = createRoutesFromElements(
    <Route
      path="/"
      element={
        <Provider store={store}>
          <MainPage />
        </Provider>
      }
    >
      <Route
        index
        element={
          <Provider store={store}>
            <Details />
          </Provider>
        }
      />
    </Route>,
  );

  it('Loading indicator is displayed while fetching data', async () => {
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router} />);
    const card = (await screen.findAllByTestId('card'))[0];
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    fireEvent.click(card);
    const details = screen.getByTestId('details');
    expect(details).toMatchSnapshot();
    expect(details).toContainHTML(
      '<span class="loader" data-testid="loader" />',
    );
  });

  it('Detailed card component correctly displays the detailed card data;', async () => {
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router} />);
    const card = (await screen.findAllByTestId('card'))[0];
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    fireEvent.click(card);
    expect(screen.getByTestId('details')).toMatchSnapshot();
    expect(await screen.findByTestId('details-h1')).toHaveTextContent(
      'details',
    );
    expect(screen.getByText('EarthAnimal: No')).toBeInTheDocument();
    expect(screen.getByText('Avian: Yes')).toBeInTheDocument();
  });

  it('Clicking the close button hides the component.', async () => {
    render(
      <MemoryRouter initialEntries={['/?details=Cat']}>
        <Provider store={store}>
          <Details />
        </Provider>
      </MemoryRouter>,
    );
    expect(await screen.findByTestId('details')).toBeInTheDocument();
    expect(screen.getByTestId('details')).toMatchSnapshot();
    fireEvent.click(screen.getByTestId('cross'));
    expect(screen.queryByTestId('details')).toMatchSnapshot();
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    expect(screen.queryByTestId('details-h1')).not.toBeInTheDocument();
    expect(screen.queryByText('EarthAnimal: No')).not.toBeInTheDocument();
    expect(screen.queryByText('Avian: Yes')).not.toBeInTheDocument();
  });
});
