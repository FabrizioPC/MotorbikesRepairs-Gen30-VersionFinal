import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const createUserSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a string',
      required_error: 'name is required',
    })
    .min(3, { message: 'Name is too short' })
    .max(100, { message: 'Name is too long' }),
  email: z
    .string({
      required_error: 'email is required',
    })
    .max(150, { message: 'Email is too long' })
    .email({ message: 'Invalid email' }),
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(8, { message: 'Password must be at least 8 characters' }),
  role: z.enum(['client', 'employee']).default('client'),
});
const updateUserSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a string',
      required_error: 'name is required',
    })
    .min(3, { message: 'Name is too short' })
    .max(100, { message: 'Name is too long' }),
  email: z
    .string({
      required_error: 'email is required',
    })
    .max(150, { message: 'Email is too long' })
    .email({ message: 'Invalid email' }),
});
const loginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export function validateUser(data) {
  const result = createUserSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}
export function validateUpdateUser(data) {
  const result = createUserSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}
export function validateLogin(data) {
  const result = loginUserSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}
