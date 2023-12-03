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

export interface ErrorState {
  name: string;
  age: string;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: string;
  accept: string;
  image: string;
  country: string;
}
