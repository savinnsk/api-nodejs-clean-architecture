import env from "@/app/config/env";
import { LoadAccountByTokenUseCase } from "@/data/usecases/load-account-by-token/load-account-by-token-usecase";
import { ILoadAccountByToken } from "@/domain/usecases/login/load-account-by-token";
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter/jwt-adapter";
import { AccountMongoRepository } from "@/infra/db/mongodb/account/account-mongo-repository";

export const makeLoadAccountByTokenFactory = (): ILoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.secret);
  const accountMongoRepository = new AccountMongoRepository();
  return new LoadAccountByTokenUseCase(jwtAdapter, accountMongoRepository);
};
