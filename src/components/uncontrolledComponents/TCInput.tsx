import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function TCInput(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  const errorAccept = useSelector((state: RootState) => state.error.accept);

  return (
    <div className="input-container">
      <div className="tc-input-block">
        <input type="checkbox" ref={inputRef} />
        <label htmlFor="accept">Accept Term and Conditions</label>
      </div>
      <span className="error-message">
        {errorAccept ? errorAccept : ''}
      </span>
    </div>
  );
}
