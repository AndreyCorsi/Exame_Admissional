export interface Setor {
    id?: number;
    nome: string;
    descricao: string;
    data_criacao: Date;
    data_atualizacao?: Date;
    id_empresa: number;
}