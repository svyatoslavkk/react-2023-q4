import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ValidationError } from 'yup';
import { setValidationErrors, removeValidationErrors } from '../redux/features/errorSlice';
import { setForm, setNewFormAdded } from '../redux/features/formSlice';
import { validationSchema } from '../utils/validation';
import { passwordStrengthCheck } from '../utils/passwordStrengthCheck';
import { fileToBase64 } from '../utils/fileToBase64';
import AgeInput from '../components/uncontrolledComponents/AgeInput';
import CountryInput from '../components/uncontrolledComponents/CountryInput';
import EmailInput from '../components/uncontrolledComponents/EmailInput';
import GenderInput from '../components/uncontrolledComponents/GenderInput';
import ImageInput from '../components/uncontrolledComponents/ImageInput';
import NameInput from '../components/uncontrolledComponents/NameInput';
import PasswordInput from '../components/uncontrolledComponents/PasswordInput';
import TCInput from '../components/uncontrolledComponents/TCInput';

export default function UncontrolledFormPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [countriesFilteredVisible, setCountriesFilteredVisible] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(
        {
          name: nameRef.current?.value[0],
          age: Number(ageRef.current?.value),
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          passwordRepeat: passwordRepeatRef.current?.value,
          accept: acceptRef.current?.checked,
          gender: genderRef.current?.value,
          image: imageRef.current?.files,
          country: countryRef.current?.value,
        },
        { abortEarly: false }
      );
      dispatch(removeValidationErrors());

      const image64 =
        imageRef.current && imageRef.current.files
          ? await fileToBase64(imageRef.current.files[0])
          : '';

      dispatch(
        setForm({
          name: nameRef.current?.value[0],
          age: Number(ageRef.current?.value),
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          gender: genderRef.current?.value,
          image: image64,
          country: countryRef.current?.value,
        })
      );
      setTimeout(() => navigate('/'), 1000);
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        dispatch(setValidationErrors(e.inner));
      }
    } finally {
      passwordStrengthCheck(passwordRef.current?.value || '').then(
        (strength) => {
          setPasswordStrength(strength);
        }
      );
    }
  };

  useEffect(() => {
    dispatch(setNewFormAdded(false));
  }, [dispatch]);

  return (
    <div
      className="container"
      onClick={(e) => {
        if (e.target !== countryRef.current) {
          setCountriesFilteredVisible(false);
        }
      }}
    >
      <h1>Uncontrolled Form Page</h1>
      <div onClick={() => setCountriesFilteredVisible(false)}>
        <Link
          to="/"
          onClick={() => {
            dispatch(removeValidationErrors());
          }}
        >
          <button className="classic-button">
            Main page
          </button>
        </Link>
      </div>
      <div>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <NameInput inputRef={nameRef} />
          <AgeInput inputRef={ageRef} />
          <EmailInput inputRef={emailRef} />
          <PasswordInput
            passwordRef={passwordRef}
            passwordRepeatRef={passwordRepeatRef}
            strength={passwordStrength}
          />
          <GenderInput genderRef={genderRef} />
          <TCInput inputRef={acceptRef} />
          <ImageInput inputRef={imageRef} />
          <CountryInput
            inputRef={countryRef}
            countriesFilteredVisible={countriesFilteredVisible}
            setCountriesFilteredVisible={setCountriesFilteredVisible}
          />
          <button
            className="classic-button"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
