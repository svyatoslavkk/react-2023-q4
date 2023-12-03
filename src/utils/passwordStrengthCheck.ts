import { passwordSchema } from './validation';
import { ValidationError } from 'yup';

export async function passwordStrengthCheck(password: string): Promise<number> {
  const maxStrength = 4;

  try {
    await passwordSchema.validate({ password }, { abortEarly: false });
    return maxStrength;
  } catch (error) {
    if (error instanceof ValidationError) {
      return maxStrength - error.inner.length;
    }
    return 0;
  }
}
