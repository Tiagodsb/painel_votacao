import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import db, { autorizarUsuario, buscarPorUsuario, cadastrarUsuario } from './db.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/usuarios', (_req, res ) => {
    const sql = `SELECT * FROM usuarios`;
    const usuarios = db.prepare(sql).all();
    return res.json(usuarios);
});

app.post('/usuarios', async (req, res) => {
    const usuario = req.body;

    const usuarioExiste = buscarPorUsuario(usuario.usuario);
    if(usuarioExiste != null) {
        return res.status(409).json({mensagem: `O nome de usuario '${usuario.usuario}' não está disponível.`});
    }
    const novoUsuario = await cadastrarUsuario(usuario.usuario, usuario.senha, usuario.tipo);
    return res.json(novoUsuario);
});

app.post('/auth', async (req, res) => {
    const {usuario, senha} = req.body;
    const autorizado = await autorizarUsuario(usuario, senha);
    if(autorizado){
        return res.json({"mensagem": "autorizado."});
    }
    return res.json({"mensagem": "usuário ou senha incorretos."});
});

export default app;