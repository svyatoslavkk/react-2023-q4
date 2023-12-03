export default function TCInput() {
  return (
    <>
      <label htmlFor="accept">Accept Term and Conditions</label>
      <div>
        <input className="tc-input" type="checkbox" />
        <span className="error-message"></span>
      </div>
    </>
  );
}
