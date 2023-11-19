import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResultList from '../components/ResultList';

function createCardsListResponseMock(
  arrLength: number,
  limit: number,
  details: boolean,
) {
  return new Array(arrLength)
    .fill(undefined)
    .map((_, ind) => {
      return {
        id: ind,
        name: details ? 'details' : `testCard-${ind}`,
        avian: true,
        canine: false,
        earthAnimal: false,
        earthInsect: false,
        feline: false,
      };
    })
    .slice(0, limit);
}

vi.mock('react-redux');

describe('Tests for the Card List component', () => {
  it('Component renders the specified number of cards - 10', async () => {
    const searchResults = render(
      <MemoryRouter>
        <ResultList
          params={new URLSearchParams('')}
          setParams={vi.fn()}
          searchResults={createCardsListResponseMock(7, 10, false)}
        />
      </MemoryRouter>,
    );
    expect(searchResults.baseElement).toMatchSnapshot();
    expect(await screen.findAllByText(/testCard/)).toHaveLength(7);
  });

  it('An appropriate message is displayed if no cards are present', async () => {
    const searchResults = render(
      <MemoryRouter>
        <ResultList
          params={new URLSearchParams('')}
          setParams={vi.fn()}
          searchResults={[]}
        />
      </MemoryRouter>,
    );

    expect(searchResults.baseElement).toMatchSnapshot();
    expect(screen.queryByText('Nothing foundddddddddddd:(')).toBeFalsy();
    expect(screen.getByText('Nothing found:(')).toBeTruthy();
    expect(screen.queryByText(/testCard/)).toBeFalsy();
  });
});
