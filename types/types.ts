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

type TestUser = Credentials & UserMeta;

export type LoginCredentials = Pick<Credentials, 'email' | 'password'>;
