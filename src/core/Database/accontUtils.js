import Database from "better-sqlite3";

export class AccontUtils {
  constructor(dbPath) {
    this.db = new Database(dbPath, { verbose: console.log });
    
    // Cria a tabela de contas se não existir
    const stmt = this.db.prepare(`
      CREATE TABLE IF NOT EXISTS accounts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_number TEXT NOT NULL UNIQUE,
          account_type TEXT NOT NULL,
          balance REAL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    stmt.run();
  }

  addAccount(account_number, account_type, balance) {
    try {
      const insertAccount = this.db.prepare('INSERT INTO accounts (account_number, account_type, balance, created_at) VALUES (?, ?, ?, ?)');
      insertAccount.run(account_number, account_type, balance, new Date().toISOString());
      console.log("Conta inserida com sucesso!");
    } catch (err) {
      console.log("Aviso: Provavelmente a conta já existe.");
    }
  }

  getAccountByNumber(account_number) {
    const getAccountByNumber = this.db.prepare('SELECT * FROM accounts WHERE account_number = ?');
    return getAccountByNumber.get(account_number);
  }

  getBalanceByAccountNumber(account_number) {
    const getBalanceByAccountNumber = this.db.prepare('SELECT balance FROM accounts WHERE account_number = ?');
    const row = getBalanceByAccountNumber.get(account_number);
    return row ? row.balance : null;
  }

  

  updateAccountBalance(account_number, new_balance) {
    const updateAccountBalance = this.db.prepare('UPDATE accounts SET balance = ? WHERE account_number = ?');
    const result = updateAccountBalance.run(new_balance, account_number);
    return result.changes > 0;
  }
}
