import { Authentication, AuthenticationDTO } from "../../../domain/usecases/authentication"
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-email-repository"

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: AuthenticationDTO): Promise<string> {
    const { email } = authentication
    await this.loadAccountByEmailRepository.load(email)
    return null
  }
}
