import { Encrypter } from "@/domain/cryptography/encrypter";
import { HashComparer } from "@/domain/cryptography/hash-compare";
import { LoadAccountByEmailRepository } from "@/domain/repository/account/load-account-email-repository";
import { UpdateAccessTokenRepository } from "@/domain/repository/account/update-access-token-repository";
import {
  Authentication,
  AuthenticationDTO,
} from "@/domain/usecases/login/authentication";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(authentication: AuthenticationDTO): Promise<string> {
    const { email, password } = authentication;
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);
    if (account) {
      const isValid = await this.hashComparer.compare(
        password,
        account.password
      );
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        );

        return accessToken;
      }
    }

    return null;
  }
}
