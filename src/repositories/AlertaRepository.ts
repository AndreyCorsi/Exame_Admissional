import {Alerta} from '../models/Alerta';
import db from '../database/database';

export class AlertaRepository {
    salvar(alerta: Alerta): Alerta {
      const resultado = db
        .prepare("INSERT INTO alerta (dataVencimento, diasParaVencer, nivel, resolvido, id_funcionario, id_exame_ocupacional) VALUES (?, ?, ?, ?, ?, ?)")
        .run(alerta.dataVencimento, alerta.diasParaVencer, alerta.nivel, alerta.id_funcionario, alerta.id_exame_ocupacional);

        return { id: Number(resultado.lastInsertRowid), dataVencimento: alerta.dataVencimento, diasParaVencer: alerta.diasParaVencer, nivel: alerta.nivel, id_funcionario: alerta.id_funcionario, id_exame_ocupacional: alerta.id_exame_ocupacional };
    }
    listar(): Alerta[] {
        return db
        .prepare("SELECT * FROM alerta").all() as Alerta[];
    }
    buscarPorId(id: number): Alerta | null {
        return (db.prepare("SELECT * FROM alerta WHERE id = ?").get(id) as Alerta) ?? null;
    }
    
    buscarPorFuncionario(id_funcionario: number): Alerta[] {
        return db.prepare("SELECT * FROM alerta WHERE id_funcionario = ?").all(id_funcionario) as Alerta[];
    }
    atualizar(id: number, a:Alerta): boolean {
        const resultado = db
        .prepare("UPDATE alerta SET dataVencimento = ?, diasParaVencer = ?, nivel = ?,, id_funcionario = ?, id_exame_ocupacional = ? WHERE id = ?")
        .run(a.dataVencimento, a.diasParaVencer, a.nivel,  a.id_funcionario, a.id_exame_ocupacional, id);

        return resultado.changes > 0;
    }
}