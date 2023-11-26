import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createCardsListResponseMock } from './mocks/_mocks';
import ResultList from '../components/ResultList';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for the Card List component', () => {
  it('Component renders the specified number of cards - 7', async () => {
    render(
      <ResultList searchResults={createCardsListResponseMock(7, 10, false)} />,
    );

    expect(await screen.findAllByText(/testCard/)).toHaveLength(7);
  });

  it('An appropriate message is displayed if no cards are present', async () => {
    render(<ResultList searchResults={[]} />);

    expect(screen.getByText('No results found.')).toBeTruthy();

    expect(screen.queryByText(/testCard/)).toBeFalsy();
  });
});
