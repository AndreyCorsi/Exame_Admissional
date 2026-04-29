import db from "../database/database";
import {Cargo} from "../models/Cargo";


export class CargoRepository {
    salvar(cargo: Cargo): Cargo {
        const resultado = db
        .prepare("INSERT INTO cargo (nome, codigoCBO, descricaoAtividades, id_setor) VALUES (?, ?, ?, ?)")
        .run(cargo.nome, cargo.codigoCBO, cargo.descricaoAtividades, cargo.id_setor);
    
        return { id: Number(resultado.lastInsertRowid), nome: cargo.nome, codigoCBO: cargo.codigoCBO, descricaoAtividades: cargo.descricaoAtividades, id_setor: cargo.id_setor };
    }
    listar(): Cargo[] {
        return db.prepare("SELECT * FROM cargo").all() as Cargo[];
    }
    buscarPorId(id: number): Cargo | null {
        return (db.prepare("SELECT * FROM cargo WHERE id = ?").get(id) as Cargo) ?? null;
    }
    buscarPorSetor(id_setor: number): Cargo | null {
        return (db.prepare("SELECT * FROM cargo WHERE id_setor = ?").get(id_setor) as Cargo) ?? null;
    }
    buscarPorCodigoCBO(codigoCBO: string): Cargo | null {
        return (db.prepare("SELECT * FROM cargo WHERE codigoCBO = ?").get(codigoCBO) as Cargo) ?? null;
    }
    atualizar(id: number, c:Cargo): boolean {
        const resultado = db 
        .prepare("UPDATE cargo SET nome = ?, codigoCBO = ?, descricaoAtividades = ?, id_setor = ? WHERE id = ?")
        .run(c.nome, c.codigoCBO, c.descricaoAtividades, c.id_setor, id);

        return resultado.changes > 0;
    }
    remover(id: number): boolean{
        const resultado = db
        .prepare("DELETE FROM cargo WHERE id = ?")
        .run(id);
        return resultado.changes > 0;
 }
}