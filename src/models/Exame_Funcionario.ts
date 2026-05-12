export interface Exame_Funcionario {
    id?: number;
    dataRealizacao: string;
    dataVencimento: string;
    resultado: string;
    situacao: string;
    medicoResponsavel: string;
    crmMedico: string;
    observacoes: string;
    id_funcionario: number;
    id_exame_ocupacional: number;
    tipo_exame?: string;
}
