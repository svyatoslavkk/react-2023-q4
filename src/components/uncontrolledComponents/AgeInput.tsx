import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function AgeInput(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  const errorAge = useSelector((state: RootState) => state.error.age);

  return (
    <div className="input-container">
      <label className="title" htmlFor="age">Age:</label>
      <div className="input-block">
        <input className="classic-input" type="text" ref={inputRef} />
        <span className="error-message">
          {errorAge ? errorAge : ''}
        </span>
      </div>
    </div>
  );
}
