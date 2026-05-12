import {Exame_Funcionario} from '../models/Exame_Funcionario';
import db from '../database/database';

export class ExameFuncionarioRepository {
    salvar(ef: Exame_Funcionario): Exame_Funcionario {
        const resultado = db
        .prepare(`INSERT INTO exame_funcionario
            (dataRealizacao, dataVencimento, resultado, situacao, medicoResponsavel, crmMedico, observacoes, id_funcionario, id_exame_ocupacional, tipo_exame)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(
            ef.dataRealizacao, ef.dataVencimento, ef.resultado, ef.situacao,
            ef.medicoResponsavel, ef.crmMedico, ef.observacoes,
            ef.id_funcionario, ef.id_exame_ocupacional,
            ef.tipo_exame || "Admissional"
        );

        return { id: Number(resultado.lastInsertRowid), ...ef, tipo_exame: ef.tipo_exame || "Admissional" };
    }

    listar(): Exame_Funcionario[] {
        return db.prepare("SELECT * FROM exame_funcionario").all() as Exame_Funcionario[];
    }

    buscarPorId(id: number): Exame_Funcionario | null {
        return (db.prepare("SELECT * FROM exame_funcionario WHERE id = ?").get(id) as Exame_Funcionario) ?? null;
    }

    buscarPorFuncionario(id_funcionario: number): Exame_Funcionario[] {
        return db.prepare("SELECT * FROM exame_funcionario WHERE id_funcionario = ?").all(id_funcionario) as Exame_Funcionario[];
    }

    buscarPorSituacao(situacao: string): Exame_Funcionario[] {
        return db.prepare("SELECT * FROM exame_funcionario WHERE situacao = ?").all(situacao) as Exame_Funcionario[];
    }

    atualizar(id: number, e: Exame_Funcionario): boolean {
        const resultado = db
        .prepare(`UPDATE exame_funcionario
            SET dataRealizacao = ?, dataVencimento = ?, resultado = ?, situacao = ?,
                medicoResponsavel = ?, crmMedico = ?, observacoes = ?,
                id_funcionario = ?, id_exame_ocupacional = ?, tipo_exame = ?
            WHERE id = ?`)
        .run(
            e.dataRealizacao, e.dataVencimento, e.resultado, e.situacao,
            e.medicoResponsavel, e.crmMedico, e.observacoes,
            e.id_funcionario, e.id_exame_ocupacional,
            e.tipo_exame || "Admissional",
            id
        );
        return resultado.changes > 0;
    }

    remover(id: number): boolean {
        const resultado = db.prepare("DELETE FROM exame_funcionario WHERE id = ?").run(id);
        return resultado.changes > 0;
    }

    calcularDataVencimento(dataRealizacao: string, periodicidadeMeses: number): string {
        const vencimento = new Date(dataRealizacao);
        vencimento.setMonth(vencimento.getMonth() + periodicidadeMeses);
        return vencimento.toISOString().split("T")[0];
    }

    listarVencidos(): Exame_Funcionario[] {
        return db
            .prepare("SELECT * FROM exame_funcionario WHERE dataVencimento != '' AND date(dataVencimento) < date('now')")
            .all() as Exame_Funcionario[];
    }

    listarProximosAoVencimento(dias: number = 30): Exame_Funcionario[] {
        return db
            .prepare(`SELECT * FROM exame_funcionario WHERE dataVencimento != '' AND date(dataVencimento) BETWEEN date('now') AND date('now', ?)`)
            .all(`+${dias} dias`) as Exame_Funcionario[];
    }

    salvarComPeriodicidade(ef: Exame_Funcionario, periodicidadeMeses: number): Exame_Funcionario {
        ef.dataVencimento = this.calcularDataVencimento(ef.dataRealizacao, periodicidadeMeses);
        return this.salvar(ef);
    }
}
