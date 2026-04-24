export interface Empresa {
    id?: number;
    razaoSocial: string;
    cnpj: string;
    cnae: string;
    totalFuncionarios: number;
    data_criacao: Date;
    data_atualizacao: Date;
}