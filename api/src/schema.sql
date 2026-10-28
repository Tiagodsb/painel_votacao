
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY,
    usuario TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    tipo TEXT NOT NULL
        CHECK (tipo IN ('Operador', 'Parlamentar')),
    ativo INTEGER NOT NULL DEFAULT 1
        CHECK (ativo IN (0, 1))
);

CREATE TABLE IF NOT EXISTS vereadores (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    partido TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessoes (
    id INTEGER PRIMARY KEY,
    tipo TEXT NOT NULL,
    data TEXT NOT NULL,
    horario TEXT NOT NULL,
    estado TEXT NOT NULL DEFAULT 'Agendada'
        CHECK (estado IN ('Agendada', 'Em andamento', 'Encerrada')),
    presidente_id INTEGER NOT NULL,
    FOREIGN KEY (presidente_id) REFERENCES vereadores(id)
);

CREATE TABLE IF NOT EXISTS materias (
    id INTEGER PRIMARY KEY,
    tipo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    data_de_apresentacao TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS presencas (
    id INTEGER PRIMARY KEY,
    vereador_id INTEGER NOT NULL,
    sessao_id INTEGER NOT NULL,
    presente INTEGER NOT NULL DEFAULT 1
        CHECK (presente IN (0, 1)),
    UNIQUE (vereador_id, sessao_id),
    FOREIGN KEY (vereador_id) REFERENCES vereadores(id),
    FOREIGN KEY (sessao_id) REFERENCES sessoes(id)
);

CREATE TABLE IF NOT EXISTS votacoes (
    id INTEGER PRIMARY KEY,
    materia_id INTEGER NOT NULL,
    sessao_id INTEGER NOT NULL,
    estado TEXT NOT NULL DEFAULT 'Em votação'
        CHECK (estado IN ('Em votação', 'Encerrada', 'Cancelada')),
    UNIQUE (materia_id, sessao_id),
    FOREIGN KEY (materia_id) REFERENCES materias(id),
    FOREIGN KEY (sessao_id) REFERENCES sessoes(id)
);

CREATE TABLE IF NOT EXISTS votacoes_por_vereador (
    id INTEGER PRIMARY KEY,
    votacao_id INTEGER NOT NULL,
    vereador_id INTEGER NOT NULL,
    voto TEXT NOT NULL
        CHECK (voto IN ('sim', 'não', 'abstenção')),
    UNIQUE (votacao_id, vereador_id),
    FOREIGN KEY (votacao_id) REFERENCES votacoes(id),
    FOREIGN KEY (vereador_id) REFERENCES vereadores(id)
);

CREATE TABLE IF NOT EXISTS cronometros (
    id INTEGER PRIMARY KEY,
    sessao_id INTEGER NOT NULL,
    vereador_id INTEGER NOT NULL,
    tempo INTEGER NOT NULL DEFAULT 0
        CHECK (tempo >= 0),
    FOREIGN KEY (sessao_id) REFERENCES sessoes(id),
    FOREIGN KEY (vereador_id) REFERENCES vereadores(id)
);

CREATE TABLE IF NOT EXISTS discursos (
    id INTEGER PRIMARY KEY,
    vereador_id INTEGER NOT NULL,
    sessao_id INTEGER NOT NULL,
    ordem INTEGER NOT NULL
        CHECK (ordem > 0),
    FOREIGN KEY (vereador_id) REFERENCES vereadores(id),
    FOREIGN KEY (sessao_id) REFERENCES sessoes(id),
    UNIQUE (sessao_id, ordem)
);
