export default function ImageInput() {
  return (
    <>
      <label htmlFor="image">Image:</label>
      <div>
        <input className="image-input" type="file" />
        <span className="error-message"></span>
      </div>
    </>
  );
}
