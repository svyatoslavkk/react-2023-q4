export default function AgeInput() {
  return (
    <>
      <label htmlFor="age">Age:</label>
      <div>
        <input className="age-input" type="text" />
        <span className="error-message"></span>
      </div>
    </>
  );
}
