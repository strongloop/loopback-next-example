import {api} from '@loopback/rest';
import {def} from './AccountManagementController.api';
import {AccountRepository} from '../repositories/account';
import {CustomerRepository} from '../repositories/customer';
import {TransactionRepository} from '../repositories/transaction';
import bluebird = require('bluebird');

@api(def)
export class AccountController {
  accountRepository: AccountRepository;
  customerRepository: CustomerRepository;
  transactionRepository: TransactionRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
    this.customerRepository = new CustomerRepository();
    this.transactionRepository = new TransactionRepository();
  }

  async getSummary(accountNumber): Promise<string> {
    const account = await this.accountRepository.find(accountNumber);
    const customer = await this.customerRepository.find(account.customerNumber);
    const transaction = await this.transactionRepository.find(accountNumber);

    const summary = await bluebird.props({
      account,
      customer,
      transaction,
    });
    return JSON.stringify(summary);
  }

  async getAccount(accountNumber): Promise<string> {
    const account = await this.accountRepository.find(accountNumber);
    return JSON.stringify(account);
  }

  async createAccount(accountInstance): Promise<string> {
    const account = await this.accountRepository.create(accountInstance);
    return JSON.stringify(account);
  }
}
