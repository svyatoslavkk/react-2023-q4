import { FormProps } from "../../interfaces/interfaces";

export default function TCInput(props: FormProps) {
  const { register, error } = props;

  return (
    <div className="input-container">
      <div className="tc-input-block">
        <input
          className="tc-input"
          type="checkbox"
          {...register('accept')}
        />
        <label htmlFor="accept">Accept Term and Conditions</label>
      </div>
      <span className="error-message">{error ? error : ''}</span>
    </div>
  );
}
