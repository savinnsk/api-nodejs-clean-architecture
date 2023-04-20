export interface Authentication {
  auth(authentication: AuthenticationDTO): Promise<string | null>;
}

export type AuthenticationDTO = {
  email: string;
  password: string;
};
