import { fetchCharacters } from '../services/services';

(global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
  ok: true,
  json: () =>
    Promise.resolve({
      results: [
        {
          id: 1,
          name: 'Character 1',
          status: 'Alive',
          species: 'Human',
          image: 'image1.jpg',
        },
        {
          id: 2,
          name: 'Character 2',
          status: 'Dead',
          species: 'Alien',
          image: 'image2.jpg',
        },
      ],
      info: { pages: 1 },
    }),
});

describe('fetchCharacters', () => {
  it('should fetch characters successfully', async () => {
    const searchTerm = 'Rick';
    const page = 1;
    const perPage = 10;

    const result = await fetchCharacters(searchTerm, page, perPage);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${page}&per_page=${perPage}`,
    );

    // Asserting the returned result
    expect(result).toEqual({
      results: [
        {
          id: 1,
          name: 'Character 1',
          status: 'Alive',
          species: 'Human',
          image: 'image1.jpg',
        },
        {
          id: 2,
          name: 'Character 2',
          status: 'Dead',
          species: 'Alien',
          image: 'image2.jpg',
        },
      ],
      pages: 1,
    });
  });

  it('should throw an error when the API request fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const searchTerm = 'Rick';
    const page = 1;
    const perPage = 10;

    await expect(fetchCharacters(searchTerm, page, perPage)).rejects.toThrow(
      'API request failed',
    );
  });
});
