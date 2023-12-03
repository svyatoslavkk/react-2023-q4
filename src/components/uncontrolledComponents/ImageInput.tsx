import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function ImageInput(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  const errorImage = useSelector((state: RootState) => state.error.image);

  return (
    <div className="input-container">
      <label className="title" htmlFor="image">Image:</label>
      <div className="input-block">
        <input type="file" ref={inputRef} />
        <span className="error-message">{errorImage ? errorImage : ''}</span>
      </div>
    </div>
  );
}
