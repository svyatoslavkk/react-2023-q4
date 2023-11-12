import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../components/Search';
import { fetchCharacters } from '../services/services';

jest.mock('../services/services');

describe('Search component', () => {
  it('should handle search and update results', async () => {
    const mockUpdateResults = jest.fn();
    const mockNavigate = jest.fn();
    render(
      <Search
        currentPage={1}
        totalPages={1}
        updateResults={mockUpdateResults}
        onSearchInputChange={() => {}}
        navigate={mockNavigate}
      />,
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
    const mockNavigate = jest.fn();
    const { getByText } = render(
      <Search
        currentPage={1}
        totalPages={1}
        updateResults={() => {}}
        onSearchInputChange={() => {}}
        navigate={mockNavigate}
      />,
    );
    const errorButton = getByText('Throw an Error');

    fireEvent.click(errorButton);

    expect(console.error).toHaveBeenCalledWith(
      'Simulated error:',
      expect.any(Error),
    );
  });

  it('should handle reset error', () => {
    const mockResetError = jest.fn();
    const mockNavigate = jest.fn();
    render(
      <Search
        currentPage={1}
        totalPages={1}
        updateResults={() => {}}
        onSearchInputChange={() => {}}
        navigate={mockNavigate}
      />,
    );

    fireEvent.click(screen.getByText('Search'));

    fireEvent.click(screen.getByText('Reload'));

    expect(mockResetError).toHaveBeenCalled();
  });

  it('should disable Search button during loading', async () => {
    const mockNavigate = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Search
        currentPage={1}
        totalPages={1}
        updateResults={() => {}}
        onSearchInputChange={() => {}}
        navigate={mockNavigate}
      />,
    );
    const input = getByPlaceholderText(
      'Enter character name',
    ) as HTMLInputElement;
    const searchButton = getByText('Search');

    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(searchButton).toBeDisabled();
    });
  });
});
