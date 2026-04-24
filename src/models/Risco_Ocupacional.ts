export interface Risco_Ocupacional {
    id?: number;
    descricao: string;
    tipo: string;
    nivel: NivelRisco;
    id_cargo: number;
    }

export enum NivelRisco {
    BAIXO = 'BAIXO',
    MEDIO = 'MEDIO',
    ALTO = 'ALTO'
}