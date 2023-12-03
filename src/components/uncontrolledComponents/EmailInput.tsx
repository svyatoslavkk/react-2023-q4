import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function EmailInput(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  const errorEmail = useSelector((state: RootState) => state.error.email);

  return (
    <div className="input-container">
      <label className="title" htmlFor="email">Email:</label>
      <div className="input-block">
        <input className="classic-input" type="text" ref={inputRef} />
        <span className="error-message">
          {errorEmail ? errorEmail : ''}
        </span>
      </div>
    </div>
  );
}
