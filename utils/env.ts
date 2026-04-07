const requiredEnv = (value: string): string => {
  const env = process.env[value];
  
  if(!env){
    throw new Error(`Missing required environment variable: ${value}`);
  }
 
  return env;
}

export const env = {
  BASE_URL: requiredEnv('BASE_URL'),
  API_URL: requiredEnv('API_URL'),
  USER_EMAIL: requiredEnv('USER_EMAIL'),
  USER_PASSWORD: requiredEnv('USER_PASSWORD'),
  INVALID_EMAIL_FORMAT: requiredEnv('INVALID_EMAIL_FORMAT'),
  INVALID_PASSWORD: requiredEnv('INVALID_PASSWORD'),
}