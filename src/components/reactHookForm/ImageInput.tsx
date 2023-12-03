import { FormProps } from "../../interfaces/interfaces";

export default function ImageInput(props: FormProps) {
  const { register, error } = props;

  return (
    <div className="input-container">
      <label className="title" htmlFor="image">Image:</label>
      <div className="input-block">
        <input
          className="image-input"
          type="file" 
          {...register('image')} 
        />
        <span className="error-message">{error ? error : ''}</span>
      </div>
    </div>
  );
}
