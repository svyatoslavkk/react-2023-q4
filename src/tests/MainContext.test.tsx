import { render } from '@testing-library/react';
import { useMainContext } from '../context/MainContext';

const TestComponent = () => {
  const context = useMainContext();
  return <div>{context.searchTerm}</div>;
};

describe('MainContext', () => {
  it('выбрасывает ошибку при использовании за пределами MainProvider', () => {
    expect(() => render(<TestComponent />)).toThrowError(
      'useMainContext must be used within a MainProvider',
    );
  });
});
