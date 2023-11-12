import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultList from '../components/ResultList';
import { Character } from '../interfaces/interfaces';
import { MainProvider } from '../context/MainContext';

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
  it('handles item click when showDetails is false', () => {
    const mockOnItemSelect = jest.fn();
    render(
      <MainProvider>
        <ResultList
          loading={false}
          results={mockResults}
          onItemSelect={mockOnItemSelect}
          showDetails={false}
          currentPage={1}
          totalPages={1}
          navigate={() => {}}
        />
      </MainProvider>,
    );

    const firstListItem = screen.getAllByRole('listitem')[0];
    fireEvent.click(firstListItem);

    expect(mockOnItemSelect).toHaveBeenCalledWith(mockResults[0]);
  });

  it('renders the correct number of elements when loading=true', () => {
    render(
      <MainProvider>
        <ResultList
          loading={true}
          results={mockResults}
          onItemSelect={() => {}}
          showDetails={false}
          currentPage={1}
          totalPages={1}
          navigate={() => {}}
        />
      </MainProvider>,
    );

    const paginationElement = screen.getByText('Pagination Component');
    expect(paginationElement).toBeInTheDocument();

    const resultItems = screen.queryAllByRole('listitem');
    expect(resultItems).toHaveLength(0);
  });

  it('renders the correct number of elements when loading=false', () => {
    render(
      <MainProvider>
        <ResultList
          loading={false}
          results={mockResults}
          onItemSelect={() => {}}
          showDetails={false}
          currentPage={1}
          totalPages={1}
          navigate={() => {}}
        />
      </MainProvider>,
    );

    const paginationElement = screen.getByText('Pagination Component');
    expect(paginationElement).toBeInTheDocument();

    const resultItems = screen.getAllByRole('listitem');
    expect(resultItems).toHaveLength(mockResults.length);
  });

  it('should call onItemSelect when an item is clicked', () => {
    const mockOnItemSelect = jest.fn();
    render(
      <MainProvider>
        <ResultList
          loading={false}
          results={mockResults}
          onItemSelect={mockOnItemSelect}
          showDetails={false}
          currentPage={1}
          totalPages={1}
          navigate={() => {}}
        />
      </MainProvider>,
    );

    const firstListItem = screen.getAllByRole('listitem')[0];
    fireEvent.click(firstListItem);

    expect(mockOnItemSelect).toHaveBeenCalledWith(mockResults[0]);
  });

  it('renders images and text content for each result', () => {
    render(
      <MainProvider>
        <ResultList
          loading={false}
          results={mockResults}
          onItemSelect={() => {}}
          showDetails={false}
          currentPage={1}
          totalPages={1}
          navigate={() => {}}
        />
      </MainProvider>,
    );

    const imageElements = screen.getAllByRole('img');
    expect(imageElements).toHaveLength(mockResults.length);

    const nameElements = screen.getAllByTestId('result-list-item-name');
    expect(nameElements).toHaveLength(mockResults.length);

    const speciesElements = screen.getAllByTestId('result-list-item-species');
    expect(speciesElements).toHaveLength(mockResults.length);
  });
});
