import Database from 'better-sqlite3';

export class TransactionsUtils {
  constructor(dbPath) {
    this.db = new Database(dbPath, { verbose: console.log });

    // Cria a tabela de transações se não existir
    const stmt = this.db.prepare(`
      CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_number TEXT NOT NULL,
          amount REAL NOT NULL,
          transaction_type TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          trans_to TEXT NOT NULL,
          FOREIGN KEY (account_number) REFERENCES accounts(account_number)
      );
    `);
    stmt.run();
  }

  addTransaction(account_number, amount, transaction_type, trans) {
    try {
      const insertTransaction = this.db.prepare('INSERT INTO transactions (account_number, amount, transaction_type, created_at, trans) VALUES (?, ?, ?, ?, ?)');
      insertTransaction.run(account_number, amount, transaction_type, new Date().toISOString(), trans);
      console.log("Transação inserida com sucesso!");
    } catch (err) {
      console.log("Erro ao inserir a transação.");
    }
  }

  getTransactionsByAccount(account_number) {
    const getTransactionsByAccount = this.db.prepare('SELECT * FROM transactions WHERE account_number = ?');
    return getTransactionsByAccount.all(account_number);
  }

  getTransactionsByReceiver(trans) {
    const getTransactionsByReceiver = this.db.prepare('SELECT * FROM transactions WHERE trans = ?');
    return getTransactionsByReceiver.all(trans);
  }
}


