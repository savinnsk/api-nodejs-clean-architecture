import { Decrypter } from "@/domain/cryptography/decrypter";
import { AccountModel } from "@/domain/models/account";
import { LoadAccountByTokenRepository } from "@/domain/repository/account/load-account-by-token";
import { ILoadAccountByToken } from "@/domain/usecases/login/load-account-by-token";

export class LoadAccountByTokenUseCase implements ILoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken);

    if (token) {
      const account = await this.loadAccountByTokenRepository.load(token, role);
      return account;
    }

    return null;
  }
}
