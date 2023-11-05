import { Character } from '../interfaces/interfaces';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCharacterDetails() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`,
        );
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Ошибка при выполнении API-запроса: ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacterDetails();
  }, [id]);

  const handleCloseDetails = () => {
    navigate('/');
  };

  if (loading) {
    return <Spinner />;
  }

  if (character) {
    return (
      <div className="details">
        <h2>{character.name}</h2>
        <img
          className="result-list-item-image"
          src={character.image}
          alt="Character Image"
        />
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <button onClick={handleCloseDetails}>Close Details</button>
      </div>
    );
  }
};

export default Details;
