export interface Exame_Funcionario {
    id?: number;
    dataRealizacao: Date;
    dataVencimento: Date;
    resultado: string;
    situacao: SituacaoExame;
    medicoResponsavel: string;
    crmMedico: string;
    observacoes?: string;
    id_funcionario: number;
    id_exame_ocupacional: number;
    }

export enum SituacaoExame {
    NORMAL,
    ALTERADO,
    PENDENTE
}