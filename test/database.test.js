import { describe, expect, jest } from '@jest/globals';
import Database from '../src/core/Database.js';
import 'dotenv/config';

db_path = process.env.DB_PATH;

describe('Database (Jest Jest)', () => {
  let database_service = new Database(db_path);

  // Roda antes de cada teste (ou use beforeAll para rodar uma vez só)
  beforeEach(() => {
    // Usamos ':memory:' para não sujar o disco, igual antes.
    // Isso simula um banco zerado a cada teste.
    database_service = new Database(db_path);
  });

  test('The count needs to be created', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    database_service.addAccount('12345-X', 'conta-corrente', 1000);

    expect(logSpy).toHaveBeenCalled();
  
  // 4. Verifica se foi chamado com uma mensagem específica
    expect(logSpy).toHaveBeenCalledWith('Aviso: Provavelmente a conta já existe.');

  // 5. IMPORTANTE: Restaura o console original depois do teste
    logSpy.mockRestore();
  });

  test("We can see the account", () => {
    database_service.addAccount('54321-X', 'poupanca', 5000);
    const account = database_service.getAccountByNumber('54321-X');
    console.log("Account Details:", account); // Para ver a saída no console
    expect(account).toBeDefined();
    expect(account.account_number).toBe('54321-X');
    expect(account.balance).toBe(5000);
  })


});
