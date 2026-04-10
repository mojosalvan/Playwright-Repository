type UserRole = 'user' | 'admin';

type Credentials = {
  name: string;
  email: string;
  password: string;
}

type UserMeta = {
  role: UserRole;
  isActive: boolean;
}

export type LoginCredentials = Pick<Credentials, 'email' | 'password'>;
