import {Exame_Ocupacional} from '../models/Exame_Ocupacional';
import db from '../database/database';

export class ExameOcupacionalRepository {
    salvar(exame: Exame_Ocupacional): Exame_Ocupacional {
        const resultado = db
        .prepare("INSERT INTO exame_ocupacional (nome, tipo, periodicidadeMeses, id_risco, dataemissao) VALUES (?, ?, ?, ?, ?)")
        .run(exame.nome, exame.tipo, exame.periodicidadeMeses, exame.id_risco, exame.dataemissao);
    
        return { id: Number(resultado.lastInsertRowid), nome: exame.nome, tipo: exame.tipo, periodicidadeMeses: exame.periodicidadeMeses, id_risco: exame.id_risco, dataemissao: exame.dataemissao };
    }
    listar(): Exame_Ocupacional[] {
        return db
        .prepare("SELECT * FROM exame_ocupacional").all() as Exame_Ocupacional[];
    }
    buscarPorId(id: number): Exame_Ocupacional | null {
        return (db.prepare("SELECT * FROM exame_ocupacional WHERE id = ?").get(id) as Exame_Ocupacional) ?? null;
    } 
    buscarPorRisco(id_risco: number): Exame_Ocupacional | null {
        return (db.prepare("SELECT * FROM exame_ocupacional WHERE id_risco = ?").get(id_risco) as Exame_Ocupacional) ?? null;
    }
    buscarPorTipo(tipo: string): Exame_Ocupacional | null {
        return (db.prepare("SELECT * FROM exame_ocupacional WHERE tipo = ?").get(tipo) as Exame_Ocupacional) ?? null;
    }
    atualizar(id: number, e:Exame_Ocupacional): boolean {
        const resultado = db 
        .prepare("UPDATE exame_ocupacional SET nome = ?, tipo = ?, periodicidadeMeses = ?, id_risco = ? WHERE id = ?")
        .run(e.nome, e.tipo, e.periodicidadeMeses, e.id_risco, id);

        return resultado.changes > 0;
    }
    remover(id: number): boolean {
        const resultado = db
        .prepare("DELETE FROM exame_ocupacional WHERE id = ?")
        .run(id);

        return resultado.changes > 0;
    }
}