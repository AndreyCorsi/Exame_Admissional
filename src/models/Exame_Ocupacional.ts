export interface Exame_Ocupacional {
    id?: number;
    nome: string;
    tipo: TipoExame;
    periodicidadeMeses: number;
    id_risco: number;
    }

export enum TipoExame {
    ADMISSIONAL,
    PERIODICO,
    RETORNO,
    DEMISSIONAL,
    MUDANCA_FUNCAO
    }