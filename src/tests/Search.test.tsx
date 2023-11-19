import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Search from '../components/Search';

describe('Tests for the Search component', () => {
  it('Clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <Provider store={store}>
        <Search params={new URLSearchParams()} setParams={vi.fn()} />
      </Provider>,
    );
    expect(localStorage.getItem('persist:root')).toBe(
      '{"search":"{\\"searchValue\\":\\"\\"}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
    );
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'hotdog' },
    });
    fireEvent.submit(screen.getByTestId('search-form'));
    await waitFor(() => {
      expect(localStorage.getItem('persist:root')).toBe(
        `{"search":"{\\"searchValue\\":\\"hotdog\\"}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}`,
      );
    });

    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'cat' },
    });
    fireEvent.submit(screen.getByTestId('search-form'));
    expect(screen.getByTestId('search-form')).toMatchSnapshot();
    await waitFor(() => {
      expect(localStorage.getItem('persist:root')).toBe(
        `{"search":"{\\"searchValue\\":\\"cat\\"}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}`,
      );
    });
  });

  it('The component retrieves the value from the local storage upon mounting.', async () => {
    const localStorageValue = localStorage.getItem('persist:root');

    const inputValue = localStorageValue
      ? JSON.parse(JSON.parse(localStorageValue).search).searchValue
      : '';
    expect(inputValue).toBe('cat');
    render(
      <Provider store={store}>
        <Search params={new URLSearchParams()} setParams={vi.fn()} />
      </Provider>,
    );
    expect(screen.getByTestId('search-form')).toMatchSnapshot();
    expect(screen.getByTestId('search-input')).toHaveValue(inputValue);
  });
});
