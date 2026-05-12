export interface Alerta {
    id?: number;
    dataVencimento: string;
    diasParaVencer: number;
    nivel: string;
    id_funcionario: number;
    id_exame_ocupacional: number;
    resolvido: boolean;
    mensagem?: string | null;
}
