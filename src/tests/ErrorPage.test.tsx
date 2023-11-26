import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorPage from '../pages/404';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for the 404 Page component', () => {
  it('404 page is displayed when navigating to an invalid route.', async () => {
    const page = render(<ErrorPage />);
    expect(page.baseElement).toMatchSnapshot();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Reload')).toBeInTheDocument();
  });
});
