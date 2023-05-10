import { Decrypter } from "@/data/protocols/cryptography/decrypter";
import { AccountModel } from "@/domain/models/account";
import { ILoadAccountByToken } from "@/domain/usecases/login/load-account-by-token";

export class LoadAccountByTokenUseCase implements ILoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken);
    throw new Error("Method not implemented.");
  }
}
