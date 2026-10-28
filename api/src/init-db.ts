import db, { cadastrarUsuario } from './db.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';


async function inicializarBanco() {
  const schemaPath = fileURLToPath(
    new URL('./schema.sql', import.meta.url)
  );

  const schema = readFileSync(schemaPath, 'utf8');

  db.exec(schema);

  console.log('Schema criado com sucesso.');

  const admin = await cadastrarUsuario("admin", "admin", "Admin");

  if(admin != null) {
    console.log("usuario inicial cadastrado.");  
  } else {
    console.error("erro: não foi possível cadastrar o usuário inicial");
  }
}

inicializarBanco().catch(erro => {
  console.error("erro ao inicializar banco de dados.", erro);
  process.exitCode = 1;
})
.finally(() => {
  db.close();
});

