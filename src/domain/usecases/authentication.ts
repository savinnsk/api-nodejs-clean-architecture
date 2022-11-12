export interface Authentication {
  auth (authentication: AuthenticationDTO): Promise<string>
}

export interface AuthenticationDTO {
  email: string
  password: string
}
