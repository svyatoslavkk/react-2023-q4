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
