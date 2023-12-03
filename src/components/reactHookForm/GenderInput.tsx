export default function GenderInput() {
  return (
    <>
      <label>Gender:</label>
      <div className="gender-options">
        <div>
          <label htmlFor="male">Male</label>
          <input type="radio" />
        </div>
        <div>
          <label htmlFor="female">Female</label>
          <input type="radio" />
        </div>
      </div>
    </>
  );
}
