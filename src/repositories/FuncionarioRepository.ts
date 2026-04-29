import db from "../database/database";
import {Funcionario} from "../models/Funcionario";

export class FuncionarioRepository {
    salvar(funcionario: Funcionario): Funcionario {
        const resultado = db
        .prepare("INSERT INTO funcionario (matricula, nome, dataAdmissao, status, data_criacao, data_atualizacao, id_cargo, id_setor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
        .run(funcionario.matricula, funcionario.nome, funcionario.dataAdmissao, funcionario.status, funcionario.data_criacao, funcionario.data_atualizacao, funcionario.id_cargo, funcionario.id_setor);
    
        return { id: Number(resultado.lastInsertRowid), matricula: funcionario.matricula, nome: funcionario.nome, dataAdmissao: funcionario.dataAdmissao, status: funcionario.status, data_criacao: funcionario.data_criacao, data_atualizacao: funcionario.data_atualizacao, id_cargo: funcionario.id_cargo, id_setor: funcionario.id_setor };
    }

    listar(): Funcionario[] {
        return db.prepare("SELECT * FROM funcionario").all() as Funcionario[];

    }

    buscarPorId(id: number): Funcionario | null {
        return (db.prepare("SELECT * FROM funcionario WHERE id = ?").get(id) as Funcionario) ?? null;
    }

    buscarPorMatricula(matricula: string): Funcionario | null {
        return (db.prepare("SELECT * FROM funcionario WHERE matricula = ?").get(matricula) as Funcionario) ?? null;
    }

    buscarPorEmpresa(id_empresa: number): Funcionario | null {
        return (db.prepare("SELECT * FROM funcionario WHERE id_empresa = ?").get(id_empresa) as Funcionario) ?? null;
    }

    buscarPorCargo(id_cargo: number): Funcionario | null {
        return (db.prepare("SELECT * FROM funcionario WHERE id_cargo = ?").get(id_cargo) as Funcionario) ?? null;
    }

    buscarPorSetor(id_setor: number): Funcionario | null {
        return (db.prepare("SELECT * FROM funcionario WHERE id_setor = ?").get(id_setor) as Funcionario) ?? null;
    }
    
    buscarPorStatus(status: string): Funcionario | null {
        return (db.prepare("SELECT * FROM funcionario WHERE status = ?").get(status) as Funcionario) ?? null;
    } 
    
    atualizar(id: number, f:Funcionario): boolean {
        const resultado = db 
        .prepare("UPDATE funcionario SET matricula = ?, nome = ?, dataAdmissao = ?, status = ?, data_criacao = ?, data_atualizacao = ?, id_cargo = ?, id_setor = ? WHERE id = ?")
        .run(f.matricula, f.nome, f.dataAdmissao, f.status, f.data_criacao, f.data_atualizacao, f.id_cargo, f.id_setor, id);
        
        return resultado.changes > 0;
    }
    remover(id: number): boolean {
        const resultado = db
        .prepare("DELETE FROM funcionario WHERE id = ?")
        .run(id);
        
        return resultado.changes > 0;
    }
}