import { AccontUtils } from "./Database/accontUtils.js";
import { UserUtils } from "./Database/userUtils.js";
import { TransactionsUtils } from "./Database/transactionsUtils.js";

export default class Database {
  constructor(dbpath) {
    this.accontutils = new AccontUtils(dbpath);
    this.userutils = new UserUtils(dbpath);
    this.transactionsutils = new TransactionsUtils(dbpath);
    this.accontutils.addAccount("0001", "bank", 1000000);
  }
  addAccount(account_number, account_type, balance) {
    this.accontutils.addAccount(account_number, account_type, balance);
  }

  getAccountByNumber(account_number) {
    return this.accontutils.getAccountByNumber(account_number);
  }

  updateAccountBalance(account_number, new_balance) {
    this.accontutils.updateAccountBalance(account_number, new_balance);
  }

  addTransaction(account_number, amount, transaction_type, trans) {
    this.transactionsutils.addTransaction(account_number, amount, transaction_type, trans);
    const balance = this.accontutils.getBalanceByAccountNumber(account_number);
    let new_balance = balance - amount;
    this.accontutils.updateAccountBalance(account_number, new_balance);

    let receiver_balance = this.accontutils.getBalanceByAccountNumber(trans);
    if (receiver_balance !== null) {
      const updated_receiver_balance = receiver_balance + amount;
      this.accontutils.updateAccountBalance(trans, updated_receiver_balance); 
    }
  }

  getTransactionsByAccount(account_number) {
    this.transactionsutils.getTransactionsByAccount(account_number);
  }

  getTransactionsByReceiver(trans) {
    this.transactionsutils.getTransactionsByReceiver(trans);
  }

  addUser(username, email, cpf) {
    this.userutils.addUser(username, email, cpf);
  }

  getUserByUsername(username) {
    this.userutils.getUserByUserName(username);
  }

  getUserByCpf(cpf) {
    this.userutils.getUserByCpf(cpf);
  }
}
