export interface ASO {
    id?: number;
    dataEmissao: Date;
    tipoExame: TipoExame;
    aptidao: ASOStatus;
    restricao: string;
    proximoASO: Date;
    medicoResponsavel: string;
    crmMedico: string;
    data_criacao: Date;
    id_funcionario: number;
}

export enum ASOStatus {
    APTO = 'APTO',
    INAPTO = 'INAPTO',
    APTO_COM_RESTRICOES = 'APTO com Restrições'
}

export enum TipoExame {
    ADMISSIONAL = 'ADMISSIONAL',
    PERIODICO = 'PERIODICO',
    RETORNO = 'RETORNO',
    DEMISSIONAL = 'DEMISSIONAL',
    MUDANCA_FUNCAO = 'MUDANCA_FUNCAO'
}