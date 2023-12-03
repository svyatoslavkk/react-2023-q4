export default function EmailInput() {
  return (
    <>
      <label htmlFor="email">Email:</label>
      <div>
        <input className="email-input" type="text" />
        <span className="error-message"></span>
      </div>
    </>
  );
}
