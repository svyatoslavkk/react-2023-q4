import { render } from '@testing-library/react';
import { useMainContext } from '../context/MainContext';

const TestComponent = () => {
  const context = useMainContext();
  return <div>{context.searchTerm}</div>;
};

describe('MainContext', () => {
  it('throws an error when used outside of MainProvider', () => {
    expect(() => render(<TestComponent />)).toThrowError(
      'useMainContext must be used within a MainProvider',
    );
  });
});
