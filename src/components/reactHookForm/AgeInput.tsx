import { FormProps } from "../../interfaces/interfaces";

export default function AgeInput(props: FormProps) {
  const { register, error } = props;

  return (
    <div className="input-container">
      <label className="title" htmlFor="age">Age:</label>
      <div className="input-block">
        <input className="classic-input" type="text" {...register('age')} />
        <span className="error-message">{error ? error : ''}</span>
      </div>
    </div>
  );
}
