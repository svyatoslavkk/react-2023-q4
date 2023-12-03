import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function NameInput(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  const errorName = useSelector((state: RootState) => state.error.name);

  return (
    <div className="input-container">
      <label className="title" htmlFor="name">Name:</label>
      <div className="input-block">
        <input className="classic-input" type="text" ref={inputRef} />
        <span className="error-message">
          {errorName ? errorName : ''}
        </span>
      </div>
    </div>
  );
}
