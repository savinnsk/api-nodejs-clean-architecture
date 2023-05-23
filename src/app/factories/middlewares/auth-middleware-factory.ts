import { AuthMiddleware } from "@/presentation/middlewares/auth-middleware";
import { Middleware } from "@/presentation/protocols/middleware";
import { makeLoadAccountByTokenFactory } from "../usecases/account/loadAccountByToken/load-account-by-token-factory";

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeLoadAccountByTokenFactory(), role);
};
