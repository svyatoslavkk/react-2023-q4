import { FormProps } from "../../interfaces/interfaces";

export default function GenderInput(props: FormProps) {
  const { register } = props;

  return (
    <div className="input-container">
      <label className="title">Gender:</label>
      <div className="input-block-secondary">
        <div className="radio-block">
          <input
            type="radio"
            defaultChecked
            {...register('gender')}
            value="male"
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className="radio-block">
          <input
            type="radio"
            defaultChecked
            {...register('gender')}
            value="female"
          />
          <label htmlFor="female">Female</label>
        </div>
      </div>
    </div>
  );
}
