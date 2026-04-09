import { LoginCredentials } from "../types/types.ts";
import { env } from '../utils/env.ts';

export const validUser: LoginCredentials = {
  email: env.USER_EMAIL,
  password: env.USER_PASSWORD,
}


export const invalidEmailFormat: LoginCredentials = {
  email: env.INVALID_EMAIL_FORMAT,
  password: env.USER_PASSWORD,
}

export const invalidPassword: LoginCredentials = {
  email: env.USER_EMAIL,
  password: env.INVALID_PASSWORD,
}