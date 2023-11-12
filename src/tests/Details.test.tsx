import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../components/Details';
import fetchMock from 'jest-fetch-mock';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    state: {
      character: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (C-137)',
          url: 'https://rickandmortyapi.com/api/location/1',
        },
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [
          'https://rickandmortyapi.com/api/episode/1',
          'https://rickandmortyapi.com/api/episode/2',
        ],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z',
      },
    },
  }),
}));

fetchMock.enableMocks();

describe('Details Component', () => {
  it('displays loading spinner while fetching data', async () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  it('displays character details when data is loaded successfully', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        location: {
          name: 'Citadel of Ricks',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      }),
    );

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText(/Alive/)).toBeInTheDocument();
      expect(screen.getByText('Human')).toBeInTheDocument();
    });
  });

  it('handles API request failure gracefully', async () => {
    fetchMock.mockReject(new Error('Fake API error'));

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText('Error while executing API request:'),
      ).toBeInTheDocument();
    });
  });

  it('navigates back to the home page when "Close Details" button is clicked', async () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockImplementation(
      () => mockNavigate,
    );

    render(
      <MemoryRouter initialEntries={['/details']}>
        <Routes>
          <Route path="/details" element={<Details />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const closeButton = screen.getByText('Close Details');
      expect(closeButton).toBeInTheDocument();

      userEvent.click(closeButton);

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
