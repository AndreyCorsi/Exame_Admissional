export interface Alerta {
    id?: number;
    dataVencimento: Date;
    diasParaVencer: number;
    nivel: NivelAlerta;
    id_funcionario: number;
    id_exame_ocupacional: number;
    resolvido: boolean;
    }

export enum NivelAlerta {
    VERDE,
    AMARELO,
    VERMELHO
}