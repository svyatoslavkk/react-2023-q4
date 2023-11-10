import { Character } from '../interfaces/interfaces';

export async function fetchCharacters(
  searchTerm: string,
  page: number,
  perPage: number,
): Promise<{ results: Character[]; pages: number }> {
  const commonUrl = 'https://rickandmortyapi.com/api/character';

  try {
    const response = await fetch(
      `${commonUrl}/?name=${searchTerm}&page=${page}&per_page=${perPage}`,
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const results: Character[] = data.results.map((result: Character) => ({
      id: result.id,
      name: result.name,
      status: result.status,
      species: result.species,
      image: result.image,
    }));

    const pages: number = data.info.pages;

    return { results, pages };
  } catch (error) {
    console.error('Error during API request: ', error);
    throw error;
  }
}
