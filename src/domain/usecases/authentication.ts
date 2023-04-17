export interface Authentication {
  auth(authentication: AuthenticationDTO): Promise<string | null>;
}

export interface AuthenticationDTO {
  email: string;
  password: string;
}
