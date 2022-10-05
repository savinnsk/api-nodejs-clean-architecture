import { AddAccountModelDTO } from '../../domain/usecases/add-account'
import { AccountModel } from '../../domain/models/account'

export interface AddAccountRepository {
  add (account: AddAccountModelDTO): Promise<AccountModel>
}
