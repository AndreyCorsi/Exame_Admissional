import {Risco_Ocupacional} from "../models/Risco_Ocupacional";
import db from "../database/database";

export class RiscoOcupacionalRepository {
    salvar(risco: Risco_Ocupacional): Risco_Ocupacional {
        const resultado = db
        .prepare("INSERT INTO risco_ocupacional (descricao, tipo, nivel, id_cargo) VALUES (?, ?, ?, ?)")
        .run(risco.descricao, risco.tipo, risco.nivel, risco.id_cargo);

        return { id: Number(resultado.lastInsertRowid), descricao: risco.descricao, tipo: risco.tipo, nivel: risco.nivel, id_cargo: risco.id_cargo };
    }
    listar(): Risco_Ocupacional[] {
        return db.prepare("SELECT * FROM risco_ocupacional").all() as Risco_Ocupacional[];
    }
    buscarPorId(id: number): Risco_Ocupacional | null {
        return (db.prepare("SELECT * FROM risco_ocupacional WHERE id = ?").get(id) as Risco_Ocupacional) ?? null;
    }
    buscarPorCargo(id_cargo: number): Risco_Ocupacional | null {
        return (db.prepare("SELECT * FROM risco_ocupacional WHERE id_cargo = ?").get(id_cargo) as Risco_Ocupacional) ?? null;
    }
    buscarPorTipo(tipo: string): Risco_Ocupacional | null {
        return (db.prepare("SELECT * FROM risco_ocupacional WHERE tipo = ?").get(tipo) as Risco_Ocupacional) ?? null;
    }
    buscarPorNivel(nivel: string): Risco_Ocupacional | null {
        return (db.prepare("SELECT * FROM risco_ocupacional WHERE nivel = ?").get(nivel) as Risco_Ocupacional) ?? null;
    }
    atualizar(id: number, r:Risco_Ocupacional): boolean {
        const resultado = db 
        .prepare("UPDATE risco_ocupacional SET descricao = ?, tipo = ?, nivel = ?, id_cargo = ? WHERE id = ?")
        .run(r.descricao, r.tipo, r.nivel, r.id_cargo, id);

        return resultado.changes > 0;
    }
    remover(id: number): boolean {
        const resultado = db
        .prepare("DELETE FROM risco_ocupacional WHERE id = ?")
        .run(id);

        return resultado.changes > 0;
    }
}