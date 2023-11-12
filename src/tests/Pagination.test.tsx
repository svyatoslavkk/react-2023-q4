import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  it('renders correctly', () => {
    render(<Pagination currentPage={1} totalPages={5} navigate={() => {}} />, {
      wrapper: MemoryRouter,
    });
    const paginationElement = screen.getByRole('list', { name: /pagination/i });
    expect(paginationElement).toBeInTheDocument();
  });

  it('disables "Prev" button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} navigate={() => {}} />, {
      wrapper: MemoryRouter,
    });
    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeDisabled();
  });

  it('disables "Next" button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} navigate={() => {}} />, {
      wrapper: MemoryRouter,
    });
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('enables "Prev" button on pages other than the first', () => {
    render(<Pagination currentPage={3} totalPages={5} navigate={() => {}} />, {
      wrapper: MemoryRouter,
    });
    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).not.toBeDisabled();
  });

  it('enables "Next" button on pages other than the last', () => {
    render(<Pagination currentPage={3} totalPages={5} navigate={() => {}} />, {
      wrapper: MemoryRouter,
    });
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).not.toBeDisabled();
  });

  it('calls handlePageChange when a page button is clicked', () => {
    const mockNavigate = jest.fn();
    render(
      <Pagination currentPage={3} totalPages={5} navigate={mockNavigate} />,
    );

    fireEvent.click(screen.getByRole('button', { name: '4' }));

    expect(mockNavigate).toHaveBeenCalledWith('?page=4');
  });

  it('calls handlePageChange when "Prev" button is clicked', () => {
    const mockNavigate = jest.fn();
    render(
      <Pagination currentPage={3} totalPages={5} navigate={mockNavigate} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /prev/i }));

    expect(mockNavigate).toHaveBeenCalledWith('?page=2');
  });

  it('calls handlePageChange when "Next" button is clicked', () => {
    const mockNavigate = jest.fn();
    render(
      <Pagination currentPage={3} totalPages={5} navigate={mockNavigate} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(mockNavigate).toHaveBeenCalledWith('?page=4');
  });
});
