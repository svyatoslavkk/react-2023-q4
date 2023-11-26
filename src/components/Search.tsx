import { useRef } from 'react';
import { useRouter } from 'next/router';
import { updateQueryParams } from '../functions/updateQueryParams';

function Search(props: Record<'searchValue', string>) {
  const { searchValue } = props;
  const inputCurrentValue = useRef(searchValue);

  const router = useRouter();

  return (
    <div className="search-component">
      <div className="input-content">
        <input
          type="text"
          className="form-field"
          placeholder="Enter character name"
          onChange={(e) => {
            e.target.value = e.target.value;
            inputCurrentValue.current = e.target.value;
          }}
        />
        <div className="button-container">
          <button
            className="search-button"
            onClick={(e) => {
              e.preventDefault();
              localStorage.setItem('search', inputCurrentValue.current);
              if (searchValue !== inputCurrentValue.current)
                router.push(
                  '?' +
                    updateQueryParams(
                      router.query,
                      'search',
                      inputCurrentValue.current,
                    ),
                );
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
