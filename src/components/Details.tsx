import { Character } from '../interfaces/interfaces';

const Details = ({
  selectedCharacter,
  onCloseDetails,
}: {
  selectedCharacter: Character | null;
  onCloseDetails: () => void;
}) => {
  if (selectedCharacter) {
    return (
      <div className="details">
        <h2>{selectedCharacter.name}</h2>
        <img
          className="result-list-item-image"
          src={selectedCharacter.image}
          alt="Character Image"
        />
        <p>Status: {selectedCharacter.status}</p>
        <p>Species: {selectedCharacter.species}</p>
        <button onClick={() => onCloseDetails()}>Close Details</button>
      </div>
    );
  }
};

export default Details;
