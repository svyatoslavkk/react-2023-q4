import { useRouter } from 'next/router';
import Image from 'next/image';
import { updateQueryParams } from '../functions/updateQueryParams';
import { Character } from '../interfaces/interfaces';

function ResultList(props: Record<'searchResults', readonly Character[]>) {
  const imgUrl =
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/010cc167400543.5b38baa438d6f.png';
  const { searchResults } = props;
  const router = useRouter();

  return (
    <>
      <div className="result-list">
        {searchResults.length ? (
          <ul className="fetching-results">
            {searchResults.map((character: Character) => (
              <li
                className="result-list-item"
                key={character.id}
                onClick={() => {
                  router.push(
                    '?' +
                      updateQueryParams(
                        router.query,
                        'details',
                        character.name,
                      ),
                  );
                }}
              >
                <Image
                  className="result-list-item-image"
                  src={imgUrl}
                  alt="Character Image"
                  width={50}
                  height={50}
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
