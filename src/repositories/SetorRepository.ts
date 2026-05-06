import db from "../database/database";
import {Setor} from "../models/Setor";

export class SetorRepository {
    salvar(setor: Setor): Setor {
        const resultado = db
        .prepare("INSERT INTO setor (nome, descricao, data_criacao, id_empresa) VALUES (?, ?, ?, ?)")
        .run(setor.nome, setor.descricao, setor.data_criacao, setor.id_empresa);
    
        return { id: Number(resultado.lastInsertRowid), nome: setor.nome, descricao: setor.descricao, data_criacao: setor.data_criacao, id_empresa: setor.id_empresa };
    }
    listar(): Setor[] {
        return db.prepare("SELECT * FROM setor").all() as Setor[];
    }
    buscarPorId(id: number): Setor | null {
        return (db.prepare("SELECT * FROM setor WHERE id = ?").get(id) as Setor) ?? null;
    }
    buscarPorEmpresa(id_empresa: number): Setor | null {
        return (db.prepare("SELECT * FROM setor WHERE id_empresa = ?").get(id_empresa) as Setor) ?? null;
    }
    atualizar(id: number, s:Setor): boolean {
        const resultado = db 
        .prepare("UPDATE setor SET nome = ?, descricao = ?, data_criacao = ?, id_empresa = ? WHERE id = ?")
        .run(s.nome, s.descricao, s.data_criacao, s.id_empresa, id);
        
        return resultado.changes > 0;
    }
    remover(id: number): boolean {
        const resultado = db
        .prepare("DELETE FROM setor WHERE id = ?")
        .run(id);
        
        return resultado.changes > 0;
    }
}