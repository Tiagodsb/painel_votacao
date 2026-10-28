import 'dotenv/config';
import app from './app.js';
import db from './db.js';

console.log(db.prepare('SELECT sqlite_version() AS version').get());


const PORT = Number(process.env.PORT ?? 3001)

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}.`));