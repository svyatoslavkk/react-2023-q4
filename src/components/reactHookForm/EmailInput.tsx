import { FormProps } from "../../interfaces/interfaces";

export default function EmailInput(props: FormProps) {
  const { register, error } = props;

  return (
    <div className="input-container">
      <label className="title" htmlFor="email">Email:</label>
      <div className="input-block">
        <input 
          className="classic-input" 
          type="text" 
          {...register('email')}
        />
        <span className="error-message">{error ? error : ''}</span>
      </div>
    </div>
  );
}
