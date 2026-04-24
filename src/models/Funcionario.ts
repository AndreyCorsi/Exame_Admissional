export interface Funcionario {
    id?: number;
    matricula: string;
    nome: string;
    dataAdmissao: Date;
    status: FuncionarioStatus;
    data_criacao: Date;
    data_atualizacao: Date;
    id_cargo: number;
    id_setor: number; 
    }

export enum FuncionarioStatus {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
    AFASTADO = 'AFASTADO'
}