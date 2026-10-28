import argon2 from 'argon2';
import Database from 'better-sqlite3';
import type { Usuario } from './types.js';

const db: Database.Database = new Database('./data/painel.db');

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.pragma('busy_timeout = 5000');

export function buscarPorUsuario(usuario: string): Usuario | null {
    const stmt = db.prepare('SELECT * FROM usuarios WHERE usuario=?');
    const row = stmt.get(usuario);
    return (row as Usuario) || null; 
}

export async function gerarHash(senha: string) {
    const hash = await argon2.hash(senha);
    return hash;
}

export async function cadastrarUsuario(usuario: string, senha: string, tipo: string) {
    const hash = await gerarHash(senha);
    const sql = `INSERT INTO usuarios(ativo, tipo, senha, usuario) VALUES(?, ?, ?, ?) RETURNING id, ativo, tipo, usuario`;
    return db.prepare(sql).get(1, tipo, hash, usuario) as Usuario;
}

export async function autorizarUsuario(usuario: string, senha: string): Promise<boolean> {
    const usuarioExiste = buscarPorUsuario(usuario);
    if(!usuarioExiste) {
        return false;
    } 
    return argon2.verify(usuarioExiste.senha, senha);
}

export default db;