import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CountryProps } from '../../interfaces/interfaces';

export default function CountryInput({
  register,
  watchCountry,
  setValue,
  error,
  countriesFilteredVisible,
  setCountriesFilteredVisible,
  trigger,
}: CountryProps) {

  const countriesAll = useSelector((state: RootState) => state.countries.countries);
  const countryRegister = register('country');
  const [countriesFiltered, setCountriesFiltered] = useState<string[]>([]);

  const filterCountries = (inputValue: string) => {
    setCountriesFilteredVisible(true);
    setCountriesFiltered(
      countriesAll.filter((country) =>
        country.toLowerCase().startsWith(inputValue.toLowerCase())
      )
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    countryRegister.onChange(e);
    filterCountries(e.target.value);
  };

  return (
    <div className="input-container">
      <label className="title" htmlFor="country">Country:</label>
      <div className="input-block">
        <input
          className="classic-input" 
          type="text" 
          {...countryRegister}
          onChange={handleInputChange}
        />
        {countriesFilteredVisible &&
          watchCountry &&
          countriesFiltered.map((country) => (
            <label
              htmlFor="country"
              key={country}
              className="country-options"
              onClick={() => {
                setValue('country', country);
                setCountriesFiltered([]);
                trigger('country');
              }}
            >
              {country}
            </label>
          ))}
        <span className="error-message">{error ? error : ''}</span>
      </div>
    </div>
  );
}
