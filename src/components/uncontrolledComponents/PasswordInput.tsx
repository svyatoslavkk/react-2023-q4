import { MutableRefObject, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface Props {
  passwordRef: MutableRefObject<HTMLInputElement | null>;
  passwordRepeatRef: MutableRefObject<HTMLInputElement | null>;
  strength: number;
}

export default function PasswordInput(props: Props) {
  const { passwordRef, passwordRepeatRef, strength } = props;
  const [passwordType, setPasswordType] = useState('password');
  const errorPassword = useSelector((state: RootState) => state.error.password);
  const errorPasswordRepeat = useSelector(
    (state: RootState) => state.error.passwordRepeat
  );
  const starsArr = new Array(4).fill(false).map((_, ind) => {
    if (ind < strength) return true;
    return false;
  });

  return (
    <div className="input-container password">
      <div className="type-password-section">
        <label className="title" htmlFor="password">Password:</label>
        <div className="type-password">
          <input className="classic-input" type={passwordType} ref={passwordRef} />
          <button
            className="eye-button"
            type="button"
            onClick={() =>
              setPasswordType(
                passwordType === 'password' ? 'text' : 'password'
              )
            }
          >
            <FontAwesomeIcon icon={passwordType === 'password' ? faEyeSlash : faEye} />
          </button>
        </div>
        <span className="error-message">
          {errorPassword ? errorPassword : ''}
        </span>
      </div>
      <div className="repeat-password-section">
        <label className="title" htmlFor="password-repeat">Repeat password:</label>
        <div className="repeat-password">
          <input
            className="classic-input"
            type={passwordType}
            ref={passwordRepeatRef}
          />
          <button
            className="eye-button"
            type="button"
            onClick={() =>
              setPasswordType(
                passwordType === 'password' ? 'text' : 'password'
              )
            }
          >
            <FontAwesomeIcon icon={passwordType === 'password' ? faEyeSlash : faEye} />
          </button>
        </div>
        <span className="error-message">
          {errorPasswordRepeat ? errorPasswordRepeat : ''}
        </span>
      </div>
      {strength > 0 ? (
        <div>
          Strength:
          <div className="flex">
            {starsArr.map((el) => {
              if (el)
                return (
                  <FontAwesomeIcon icon={faStar} />
                );
            })}
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  );
}
