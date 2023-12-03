import { FormProps } from "../../interfaces/interfaces";

export default function NameInput(props: FormProps) {
  const { register, error } = props;

  return (
    <div className="input-container">
      <label className="title" htmlFor="name">Name:</label>
      <div className="input-block">
        <input className="classic-input" type="text" {...register('name')} />
        <span className="error-message">{error ? error : ''}</span>
      </div>
    </div>
  );
}
