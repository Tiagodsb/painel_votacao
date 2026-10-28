import express from 'express';
import cors from 'cors';
import helmet from 'helmet';


import type { Usuario } from './types.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/usuarios', (_req, res ) => {
    
    let usuario1: Usuario = {
        ativo: true, id: 1, tipo: 'Operador', senhaHash: '123', usuario: 'admin'
    };

    res.json(usuario1);
});

export default app;