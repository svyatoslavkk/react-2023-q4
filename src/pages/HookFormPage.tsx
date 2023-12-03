import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AllFields } from '../interfaces/interfaces';
import { validationSchema } from '../utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { fileToBase64 } from '../utils/fileToBase64';
import { setForm, setNewFormAdded } from '../redux/features/formSlice';
import NameInput from '../components/reactHookForm/NameInput';
import AgeInput from '../components/reactHookForm/AgeInput';
import EmailInput from '../components/reactHookForm/EmailInput';
import PasswordInput from '../components/reactHookForm/PasswordInput';
import ImageInput from '../components/reactHookForm/ImageInput';
import GenderInput from '../components/reactHookForm/GenderInput';
import TCInput from '../components/reactHookForm/TCInput';
import CountryInput from '../components/reactHookForm/CountryInput';

export default function HookFormPage() {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    trigger,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const [countriesFilteredVisible, setCountriesFilteredVisible] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: AllFields) => {
    const { name, age, email, password, gender, image, country } = data;
    const image64 = image ? await fileToBase64(image[0]) : '';
    dispatch(
      setForm({
        name,
        age,
        email,
        password,
        gender,
        image: image64,
        country,
      })
    );
    navigate('/');
  };

  useEffect(() => {
    dispatch(setNewFormAdded(false));
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="main-header">Hook Form Page</h1>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button className="classic-button">
            Main page
        </button>
      </Link>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="input-list">
          <NameInput register={register} error={errors.name?.message} />
          <AgeInput register={register} error={errors.age?.message} />
          <EmailInput register={register} error={errors.email?.message} />
          <PasswordInput
            register={register}
            watchPassword={watch('password')}
            error={{
              errorPassword: errors.password?.message,
              errorPasswordRepeat: errors.passwordRepeat?.message,
            }}
          />
          <GenderInput register={register} error={errors.gender?.message} />
          <TCInput register={register} error={errors.accept?.message} />
          <ImageInput register={register} error={errors.image?.message} />
          <CountryInput
            countriesFilteredVisible={countriesFilteredVisible}
            setCountriesFilteredVisible={setCountriesFilteredVisible}
            register={register}
            watchCountry={watch('country')}
            setValue={setValue}
            error={errors.country?.message}
            trigger={trigger}
          />
        </div>
        <button
          className="classic-button"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
