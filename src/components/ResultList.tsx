import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDetailsName } from '../redux/reducers/detailsSlice';
import { useDispatch } from 'react-redux';
import { Character } from '../interfaces/interfaces';
import { updateQueryParams } from '../functions/updateQueryParams';
import { ResultListProps } from '../interfaces/interfaces';

function ResultList(props: ResultListProps) {
  const imgUrl =
    'https://live.staticflickr.com/65535/50235943523_f408808516_z.jpg';

  const { params, setParams, searchResults } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleItemClick = (characterName: string) => {
    setParams(updateQueryParams(params, 'details', characterName));
    dispatch(setDetailsName(characterName));
  };

  useEffect(() => {
    navigate('?' + props.params, { replace: true });
  }, [navigate, props.params]);

  return (
    <>
      <div className="result-list">
        {searchResults.length ? (
          <ul className="fetching-results">
            {searchResults.map((character: Character) => (
              <li
                className="result-list-item"
                key={character.id}
                onClick={() => handleItemClick(character.name)}
              >
                <img
                  className="result-list-item-image"
                  src={imgUrl}
                  alt="Character Image"
                />
                <div className="result-list-item-text-content">
                  <h3 className="result-list-item-name">{character.name}</h3>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
}

export default ResultList;
