import env from "@/app/config/env";
import { DbAuthentication } from "@/data/usecases/authentication/db-authentication";
import { Authentication } from "@/domain/usecases/login/authentication";
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter/jwt-adapter";
import { AccountMongoRepository } from "@/infra/db/mongodb/account/account-mongo-repository";

export const makerDbAuthenticationUseCase = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.secret);

  const accountMongoRepository = new AccountMongoRepository();

  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  );
};
