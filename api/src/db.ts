import Database from 'better-sqlite3';

const db: Database.Database = new Database('./data/painel.db');

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.pragma('busy_timeout = 5000');

export default db;