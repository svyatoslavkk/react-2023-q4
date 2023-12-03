import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

export interface Form {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  image: string;
  country: string;
}

export interface FormState {
  formTiles: Form[];
  newFormAdded: boolean;
}

export interface AllFields {
  name: string;
  age: string;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: string;
  accept: string;
  image: FileList | string;
  country: string;
}

export type Register = UseFormRegister<AllFields>;
export type SetValue = UseFormSetValue<AllFields>;
export type Trigger = UseFormTrigger<AllFields>;

export interface FormProps {
  register: Register;
  error: string | undefined;
};

export interface CountryProps {
  countriesFilteredVisible: boolean;
  setCountriesFilteredVisible: React.Dispatch<React.SetStateAction<boolean>>;
  register: Register;
  watchCountry: string | undefined;
  setValue: SetValue;
  trigger: Trigger;
  error: string | undefined;
}

export interface PasswordsProps {
  register: Register;
  watchPassword: string | undefined;
  error: {
    errorPassword: string | undefined;
    errorPasswordRepeat: string | undefined;
  };
};
