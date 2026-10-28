export type UsuarioTipo = 'Admin' | 'Operador' | 'Parlamentar';

export interface Usuario {
    id: number;
    usuario: string;
    senha: string;
    tipo: UsuarioTipo;
    ativo: boolean;
}

export interface Materia {
    id: number;
    tipo: string;
    descricao: string;
    data_de_apresentacao: string;
}

export interface Vereador {
    id: number;
    nome: string;
    partido: string;
}

export interface Sessao {
    id: number;
    tipo: string;
    data: Date;
    horario: string;
    estado: 'Agendada' | 'Em andamento' | 'Encerrada';
    presidenteId: number;
}

export interface Cronometro {
    id: number;
    sessaoId: number;
    vereadorId: number;
    tempo: number;
}

export interface Votacao {
    id: number;
    materiaId: number;
    sessaoId: number;
    favoraveis: number;
    contrarios: number;
    abstencao: number;
    estado: 'Em votação' | 'Encerrada' | 'Cancelada';
}

export interface VotacaoPorVereador {
    id: number;
    votacaoId: number;
    vereadorId: number;
    voto: 'sim' | 'não' | 'abstenção';
}

export interface Presenca {
    id: number;
    vereadorId: number;
    sessaoId: number;
    presente: boolean;
}

export interface Discurso {
    id: number;
    vereadorId: number;
    sessaoId: number;
    ordem: number;
}
