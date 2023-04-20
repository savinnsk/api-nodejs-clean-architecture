import { AccountModel } from "../models/account";

export type AddAccountModelDTO = {
  name: string;
  email: string;
  password: string;
};

export interface AddAccount {
  add: (account: AddAccountModelDTO) => Promise<AccountModel | null>;
}
