import { AccountModel } from "@/domain/models/account";

export interface ILoadAccountByToken {
  load(accessToken: string, role?: string): Promise<AccountModel | null>;
}
