import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import Details from '../components/Details';

fetchMock.enableMocks();

describe('Details Component', () => {
  it('displays loading spinner while fetching data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/character/1']}>
          <Routes>
            <Route path="/character/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays character details when data is loaded successfully', async () => {
    const mockCharacter = {
      id: 1,
      name: 'Rick Sanchez',
      image: 'https://example.com/rick.png',
      gender: 'Male',
      location: { name: 'Earth' },
      status: 'Alive',
      species: 'Human',
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockCharacter), { status: 200 });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/character/1']}>
          <Routes>
            <Route path="/character/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Character Image')).toHaveAttribute(
      'src',
      'https://example.com/rick.png',
    );
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Location: Earth')).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
  });

  it('handles API request failure gracefully', async () => {
    fetchMock.mockReject(new Error('Failed to fetch'));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/character/1']}>
          <Routes>
            <Route path="/character/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    expect(
      screen.getByText('Ошибка при выполнении API-запроса:'),
    ).toBeInTheDocument();
  });

  it('navigates back to the home page when "Close Details" button is clicked', async () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(require('react-router-dom'), 'useNavigate')
      .mockReturnValue(mockNavigate);

    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/character/1']}>
          <Routes>
            <Route path="/character/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    const closeButton = screen.getByText('Close Details');
    expect(closeButton).toBeInTheDocument();

    act(() => {
      closeButton.click();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
