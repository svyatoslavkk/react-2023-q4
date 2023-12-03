import { MutableRefObject, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Props {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  countriesFilteredVisible: boolean;
  setCountriesFilteredVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CountryInput(props: Props) {
  const { inputRef, countriesFilteredVisible, setCountriesFilteredVisible } =
    props;

  const counriesAll = useSelector(
    (state: RootState) => state.countries.countries
  );
  const errorCountry = useSelector((state: RootState) => state.error.country);

  const [countriesFiltered, setCountriesFiltered] = useState<string[]>([]);

  const handleChange = () => {
    setCountriesFilteredVisible(true);
    setCountriesFiltered(
      counriesAll.filter((country) =>
        country
          .toLowerCase()
          .startsWith(inputRef.current?.value?.toLowerCase() || '')
      )
    );
  };

  return (
    <div className="input-container">
      <label className="title" htmlFor="country">Country:</label>
      <div className="input-block">
        <input
          className="classic-input"
          type="text" 
          ref={inputRef}
          onChange={handleChange}
        />
        {countriesFilteredVisible &&
          countriesFiltered.map((country) => (
            <label
              htmlFor="country"
              key={country}
              onClick={() => {
                if (inputRef.current) inputRef.current.value = country;
                setCountriesFiltered([]);
              }}
            >
              {country}
            </label>
          ))
        }
        <span className="error-message">
          {errorCountry ? errorCountry : ''}
        </span>
      </div>
    </div>
  );
}
