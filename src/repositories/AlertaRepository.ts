import {Alerta} from '../models/Alerta';
import db from '../database/database';

export class AlertaRepository {
    salvar(alerta: Alerta): Alerta {
        const resultado = db
        .prepare("INSERT INTO Alerta (dataVencimento, diasParaVencer, nivel, resolvido, id_funcionario, id_exame_ocupacional, mensagem) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .run(
            alerta.dataVencimento, alerta.diasParaVencer, alerta.nivel,
            alerta.resolvido ? 1 : 0,
            alerta.id_funcionario, alerta.id_exame_ocupacional,
            alerta.mensagem ?? null
        );
        return { id: Number(resultado.lastInsertRowid), ...alerta };
    }

    listar(): Alerta[] {
        return db.prepare("SELECT * FROM Alerta").all() as Alerta[];
    }

    buscarPorId(id: number): Alerta | null {
        return (db.prepare("SELECT * FROM Alerta WHERE id = ?").get(id) as Alerta) ?? null;
    }

    buscarPorFuncionario(id_funcionario: number): Alerta[] {
        return db.prepare("SELECT * FROM Alerta WHERE id_funcionario = ?").all(id_funcionario) as Alerta[];
    }

    atualizar(id: number, a: Alerta): boolean {
        const resultado = db
        .prepare("UPDATE Alerta SET dataVencimento = ?, diasParaVencer = ?, nivel = ?, resolvido = ?, id_funcionario = ?, id_exame_ocupacional = ?, mensagem = ? WHERE id = ?")
        .run(
            a.dataVencimento, a.diasParaVencer, a.nivel,
            a.resolvido ? 1 : 0,
            a.id_funcionario, a.id_exame_ocupacional,
            a.mensagem ?? null,
            id
        );
        return resultado.changes > 0;
    }

    listarPendentes(): Alerta[] {
        return db.prepare("SELECT * FROM Alerta WHERE resolvido = 0").all() as Alerta[];
    }

    buscarPorNivel(nivel: string): Alerta[] {
        return db.prepare("SELECT * FROM Alerta WHERE nivel = ?").all(nivel) as Alerta[];
    }

    resolver(id: number): boolean {
        const resultado = db.prepare("UPDATE Alerta SET resolvido = 1 WHERE id = ?").run(id);
        return resultado.changes > 0;
    }
}
