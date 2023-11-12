import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../components/Search';
import { fetchCharacters } from '../services/services';
import { MainProvider } from '../context/MainContext';

jest.mock('../services/services');

describe('Search component', () => {
  it('should handle search and update results', async () => {
    const mockUpdateResults = jest.fn();
    const mockOnSearchInputChange = jest.fn();
    const mockNavigate = jest.fn();

    render(
      <MainProvider>
        <Search
          currentPage={1}
          totalPages={1}
          updateResults={mockUpdateResults}
          onSearchInputChange={mockOnSearchInputChange}
          navigate={mockNavigate}
        />
      </MainProvider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Enter character name'), {
      target: { value: 'Rick' },
    });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(fetchCharacters).toHaveBeenCalledWith('Rick', 1, 10);
      expect(mockUpdateResults).toHaveBeenCalledWith(expect.any(Array), 1, 1);
    });
  });

  it('should handle error when making an API request', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockOnSearchInputChange = jest.fn();
    const mockNavigate = jest.fn();

    render(
      <MainProvider>
        <Search
          currentPage={1}
          totalPages={1}
          updateResults={() => {}}
          onSearchInputChange={mockOnSearchInputChange}
          navigate={mockNavigate}
        />
      </MainProvider>,
    );

    const errorButton = screen.getByText('Throw an Error');

    fireEvent.click(errorButton);

    expect(console.error).toHaveBeenCalledWith(
      'Simulated error:',
      expect.any(Error),
    );

    const errorMessage = await screen.findByText('Simulated error');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should handle reset error', async () => {
    const mockResetError = jest.fn();
    const mockOnSearchInputChange = jest.fn();
    const mockNavigate = jest.fn();

    render(
      <MainProvider>
        <Search
          currentPage={1}
          totalPages={1}
          updateResults={() => {}}
          onSearchInputChange={mockOnSearchInputChange}
          navigate={mockNavigate}
        />
      </MainProvider>,
    );

    fireEvent.click(screen.getByText('Throw an Error'));

    fireEvent.click(screen.getByText('Reload'));

    expect(mockResetError).toHaveBeenCalled();

    const errorMessage = screen.queryByText('Simulated error');
    expect(errorMessage).toBeNull();
  });

  it('should disable Search button during loading', async () => {
    const mockOnSearchInputChange = jest.fn();
    const mockNavigate = jest.fn();

    render(
      <MainProvider>
        <Search
          currentPage={1}
          totalPages={1}
          updateResults={() => {}}
          onSearchInputChange={mockOnSearchInputChange}
          navigate={mockNavigate}
        />
      </MainProvider>,
    );

    const input = screen.getByPlaceholderText(
      'Enter character name',
    ) as HTMLInputElement;
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(searchButton).toBeDisabled();
    });

    const loadingMessage = await screen.findByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();
  });
});
