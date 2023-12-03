export default function EmailInput() {
  return (
    <>
      <label htmlFor="country">Country:</label>
      <div>
        <input className="country-input" type="text" />
        <span className="error-message"></span>
      </div>
    </>
  );
}
