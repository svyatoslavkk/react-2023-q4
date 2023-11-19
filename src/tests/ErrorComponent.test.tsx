import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import Details from '../components/Details';
import MainPage from '../components/MainPage';
import ErrorComponent from '../components/ErrorComponent';

describe('Tests for the 404 Page component', () => {
  it('404 page is displayed when navigating to an invalid route.', async () => {
    const page = render(
      <MemoryRouter initialEntries={['/sdfghjsdfghj']}>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<Details />} loader={vi.fn()} />
          </Route>
          <Route path="*" element={<ErrorComponent onReload={vi.fn()} />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(page.baseElement).toMatchSnapshot();
    expect(screen.getByText('Page not found :(')).toBeInTheDocument();
    expect(screen.getByText('Back Home')).toBeInTheDocument();
  });
});
