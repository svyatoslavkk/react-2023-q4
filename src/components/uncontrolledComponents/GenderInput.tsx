import { MutableRefObject } from 'react';

export default function GenderInput(
  props: Record<'genderRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { genderRef } = props;

  return (
    <div className="input-container">
      <label className="title">Gender:</label>
      <div className="input-block-secondary">
        <div className="radio-block">
          <label htmlFor="male">
            Male
          </label>
          <input
            type="radio"
            name="gender"
            value="male"
            ref={genderRef} 
            defaultChecked
          />
        </div>
        <div className="radio-block">
          <label htmlFor="male">
            Female
          </label>
          <input
            type="radio"
            name="gender"
            value="female"
            ref={genderRef} 
            defaultChecked
          />
        </div>
      </div>
    </div>
  );
}
