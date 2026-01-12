import Database from "better-sqlite3";

export class UserUtils {
  constructor(dbPath) {
    this.db = new Database(dbPath, { verbose: console.log });
    
    // Cria a tabela de usuários se não existir
    const stmt = this.db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          CPF TEXT UNIQUE
      );
    `);
    stmt.run();
  }

  addUser(username, email, CPF) {
    try {
      const insertUser = this.db.prepare('INSERT INTO users (username, email, created_at, CPF) VALUES (?, ?, ?, ?)');
      insertUser.run(username, email, new Date().toISOString(), CPF);
      console.log("Usuário inserido com sucesso!");
    } catch (err) {
      console.log("Aviso: Provavelmente o usuário já existe.");
    }
  }

  getUserByUsername(username) {
    const getUserByUsername = this.db.prepare('SELECT * FROM users WHERE username = ?');
    return getUserByUsername.all(username);
  }

  getUserByCPF(CPF) {
    const getUserByCPF = this.db.prepare('SELECT * FROM users WHERE CPF = ?');
    return getUserByCPF.get(CPF);
  }
}
