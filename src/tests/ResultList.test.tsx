import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultList from '../components/ResultList';
import { Character } from '../interfaces/interfaces';

jest.mock('../components/Pagination', () => ({
  __esModule: true,
  default: () => <div>Pagination Component</div>,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockResults: Character[] = [
  {
    id: 1,
    name: 'Character 1',
    gender: 'Male',
    location: { name: 'Earth' },
    title: 'Title 1',
    text: 'Text 1',
    status: 'Alive',
    species: 'Human',
    image: 'image1.jpg',
  },
  {
    id: 2,
    name: 'Character 2',
    gender: 'Female',
    location: { name: 'Mars' },
    title: 'Title 2',
    text: 'Text 2',
    status: 'Dead',
    species: 'Alien',
    image: 'image2.jpg',
  },
];

describe('ResultList Component', () => {
  it('рендерит спиннер при loading=true', () => {
    render(
      <ResultList
        loading={true}
        results={mockResults}
        allCharacters={mockResults}
        onItemSelect={() => {}}
        showDetails={false}
        currentPage={1}
        totalPages={1}
        navigate={() => {}}
      />,
    );
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  it('рендерит элементы результата при loading=false', () => {
    render(
      <ResultList
        loading={false}
        allCharacters={mockResults}
        results={mockResults}
        onItemSelect={() => {}}
        showDetails={false}
        currentPage={1}
        totalPages={1}
        navigate={() => {}}
      />,
    );
    const resultItems = screen.getAllByRole('listitem');
    expect(resultItems).toHaveLength(mockResults.length);
  });

  it('должен вызывать onItemSelect при клике на элемент', () => {
    const mockOnItemSelect = jest.fn();

    const { getByAltText } = render(
      <ResultList
        loading={false}
        allCharacters={mockResults}
        results={mockResults}
        onItemSelect={mockOnItemSelect}
        showDetails={false}
        currentPage={1}
        totalPages={1}
        navigate={() => {}}
      />,
    );

    fireEvent.click(getByAltText('Изображение персонажа'));

    expect(mockOnItemSelect).toHaveBeenCalledWith(mockResults[0]);
  });
});
