import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Details from '../components/Details';

describe('Details Component', () => {
  it('renders character details after loading', async () => {
    const mockResponse = {
      id: 1,
      name: 'Rick',
      image: 'rick.jpg',
      gender: 'Male',
      location: { name: 'Earth' },
      status: 'Alive',
      species: 'Human',
    };

    jest.spyOn(window, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      } as ResponseInit),
    );

    render(<Details />);

    await waitFor(() => {
      expect(screen.getByText('Rick')).toBeInTheDocument();
      expect(screen.getByAltText('Character Image')).toHaveAttribute(
        'src',
        'rick.jpg',
      );
      expect(screen.getByText('Gender: Male')).toBeInTheDocument();
      expect(screen.getByText('Location: Earth')).toBeInTheDocument();
      expect(screen.getByText('Status: Alive')).toBeInTheDocument();
      expect(screen.getByText('Species: Human')).toBeInTheDocument();
    });
  });
});

describe('Details Component', () => {
  it('handles errors during data fetching', async () => {
    jest
      .spyOn(window, 'fetch')
      .mockRejectedValueOnce(new Error('API request failed'));

    render(<Details />);

    await waitFor(() => {
      expect(
        screen.getByText('Ошибка при выполнении API-запроса: '),
      ).toBeInTheDocument();
    });
  });
});

describe('Details Component', () => {
  it('closes Details component on button click', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(<Details />);

    fireEvent.click(screen.getByText('Close Details'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
