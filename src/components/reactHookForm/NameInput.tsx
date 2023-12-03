export default function NameInput() {
  return (
    <>
      <label htmlFor="name">Name:</label>
      <div>
        <input className="name-input" type="text" />
        <span className="error-message"></span>
      </div>
    </>
  );
}
