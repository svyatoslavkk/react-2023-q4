import { useEffect, useState } from 'react';
import { passwordStrengthCheck } from '../../utils/passwordStrengthCheck';
import { PasswordsProps } from '../../interfaces/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function PasswordInput(props: PasswordsProps) {
  const {
    register,
    watchPassword,
    error: { errorPassword, errorPasswordRepeat },
  } = props;
  
  const [strength, setStrength] = useState<number>(0);
  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');

  useEffect(() => {
    if (watchPassword) {
      passwordStrengthCheck(watchPassword).then((newStrength) => {
        setStrength(newStrength);
      });
    }
  }, [watchPassword]);

  const togglePasswordVisibility = () => {
    setPasswordType((type) => (type === 'password' ? 'text' : 'password'));
  };

  const renderStars = () => (
    <div className="flex">
      {Array(4).fill(null).map((_, index) => (
        <div key={index}>
          {index < strength ? <FontAwesomeIcon icon={faStar} /> : null}
        </div>
      ))}
    </div>
  );

  return (
    <div className="input-container password">
      <div className="type-password-section">
        <label className="title" htmlFor="password">Password:</label>
        <div className="type-password">
          <input 
            className="classic-input" 
            type={passwordType}
            {...register('password')}
          />
          <button
            className="eye-button"
            type="button"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={passwordType === 'password' ? faEyeSlash : faEye} />
          </button>
        </div>
        <span className="type-password-error-message">{errorPassword ? errorPassword : ''}</span>
      </div>
      <div className="repeat-password-section">
        <label className="title" htmlFor="password">Repeat password:</label>
        <div className="repeat-password">
          <input
            className="classic-input"
            type="password"
            {...register('passwordRepeat')}
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
        <span className="repeat-password-error-message">
          {errorPasswordRepeat || ''}
        </span>
      </div>
      {strength > 0 && (
        <div className="strength-indicator">
          <p>Strength:</p>
          {renderStars()}
        </div>
      )}
    </div>
  );
}
