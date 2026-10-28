# API

API desenvolvida em Node.js, TypeScript e SQLite.

## Configuração do ambiente

Após clonar o repositório, acesse a pasta `api`:

```bash
cd api
```

### 1. Criar o diretório do banco de dados

```bash
mkdir -p data
```

### 2. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz da pasta `api`:

```env
PORT=3000
```

### 3. Instalar as dependências

```bash
npm ci
```

### 4. Inicializar o banco de dados

```bash
npx tsx src/init-db.ts
```

Esse comando executa o script responsável pela inicialização do banco SQLite.

### 5. Executar a API em desenvolvimento

```bash
npm run dev
```

A API será executada na porta `3000`, conforme definido no arquivo `.env`.

## Observações

- O diretório `data` armazena o banco de dados SQLite.
- O arquivo `.env` contém configurações locais e não deve ser versionado.
- O arquivo `package-lock.json` deve ser mantido no repositório para garantir a consistência das dependências.
- Os comandos acima pressupõem que Node.js e npm estejam disponíveis no ambiente de execução.
