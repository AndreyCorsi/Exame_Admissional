export interface Auditoria {
    id?: number;
    tabela : string;
    acao: AcaoAuditoria;
    data_criacao: Date;
    }

export enum AcaoAuditoria {
    Criado = 'Criado',
    Atualizado = 'Atualizado',
    Deletado = 'Deletado'
}