import { AddAccountModelDTO } from "@/domain/usecases/login/add-account";
import { AccountModel } from "@/domain/models/account";

export interface AddAccountRepository {
  add(accountData: AddAccountModelDTO): Promise<AccountModel>;
}
