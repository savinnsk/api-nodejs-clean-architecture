import { AccountModel } from "../models/account";

export interface AddAccountModelDTO {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  add: (account: AddAccountModelDTO) => Promise<AccountModel | null>;
}
