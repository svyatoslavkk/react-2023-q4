export default function PasswordInput() {
  return (
    <>
      <label htmlFor="password">Password:</label>
      <div className="type-password">
        <input className="password-input" type="password" />
        <span className="error-message"></span>
      </div>
      <label htmlFor="password">Repeat password:</label>
      <div className="repeat-password">
        <input className="password-input" type="password" />
        <span className="error-message"></span>
      </div>
    </>
  );
}
