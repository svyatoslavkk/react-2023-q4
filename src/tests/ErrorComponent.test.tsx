import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ErrorBoundary } from '../components/ErrorBoundary';
import ErrorComponent from '../components/ErrorComponent';

test('ErrorComponent renders correctly', () => {
  const onReloadMock = jest.fn();
  render(<ErrorComponent onReload={onReloadMock} />);

  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();

  screen.getByRole('button').click();
  expect(onReloadMock).toHaveBeenCalled();
});

test('ErrorBoundary displays ErrorComponent when an error occurs', () => {
  const ErrorThrowingComponent = () => {
    throw new Error('Test error');
  };

  render(
    <ErrorBoundary>
      <ErrorThrowingComponent />
    </ErrorBoundary>,
  );

  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('ErrorBoundary does not display ErrorComponent when there is no error', () => {
  render(
    <ErrorBoundary>
      <div>Content without errors</div>
    </ErrorBoundary>,
  );

  expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
