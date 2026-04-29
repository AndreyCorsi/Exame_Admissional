import {Empresa} from "../models/Empresa";
import db from "../database/database";

export class EmpresaRepository {
    salvar(empresa: Empresa): Empresa {
        const resultado = db
        .prepare("INSERT INTO empresa (razaoSocial, cnpj, cnae, totalFuncionarios, data_criacao, data_atualizacao) VALUES (?, ?, ?, ?, ?, ?)")
        .run(empresa.razaoSocial, empresa.cnpj, empresa.cnae, empresa.totalFuncionarios, empresa.data_criacao, empresa.data_atualizacao);

        return { id: Number(resultado.lastInsertRowid), razaoSocial: empresa.razaoSocial, cnpj: empresa.cnpj, cnae: empresa.cnae, totalFuncionarios: empresa.totalFuncionarios, data_criacao: empresa.data_criacao, data_atualizacao: empresa.data_atualizacao };
    }
    listar(): Empresa[] {
        return db
        .prepare("SELECT * FROM empresa").all() as Empresa[];
    }
    buscarPorId(id: number): Empresa | null {
        return (db.prepare("SELECT * FROM empresa WHERE id = ?").get(id) as Empresa) ?? null;
    }
    buscarPorRazaoSocial(razaoSocial: string): Empresa | null {
        return (db.prepare("SELECT * FROM empresa WHERE razaoSocial = ?").get(razaoSocial) as Empresa) ?? null;
    }
    atualizar(id: number, e:Empresa): boolean {
        const resultado = db 
        .prepare("UPDATE empresa SET razaoSocial = ?, cnpj = ?, cnae = ?, totalFuncionarios = ?, data_criacao = ?, data_atualizacao = ? WHERE id = ?")
        .run(e.razaoSocial, e.cnpj, e.cnae, e.totalFuncionarios, e.data_criacao, e.data_atualizacao, id);
    
        return resultado.changes > 0;
    }
    remover(id: number): boolean {
        const resultado = db
        .prepare("DELETE FROM empresa WHERE id = ?")
        .run(id);

        return resultado.changes > 0;
    }
}