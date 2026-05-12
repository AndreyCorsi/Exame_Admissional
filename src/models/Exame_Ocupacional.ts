export interface Exame_Ocupacional {
    id?: number;
    nome: string;
    tipo: string;
    periodicidadeMeses: number;
    id_risco_ocupacional: number | null;
    dataemissao: string;
}
