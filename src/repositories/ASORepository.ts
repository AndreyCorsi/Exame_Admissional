import {ASO} from '../models/ASO';
import db from '../database/database';

export class ASORepository {
    salvar(aso: ASO): ASO {
        const resultado = db
        .prepare("INSERT INTO aso (dataEmissao, tipoExame, aptidao, restricao, proximoASO, medicoResponsavel, crmMedico, data_criacao, id_funcionario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .run(aso.dataEmissao, aso.tipoExame, aso.aptidao, aso.restricao, aso.proximoASO, aso.medicoResponsavel, aso.crmMedico, aso.data_criacao, aso.id_funcionario);

        return { id: Number(resultado.lastInsertRowid), dataEmissao: aso.dataEmissao, tipoExame: aso.tipoExame, aptidao: aso.aptidao, restricao: aso.restricao, proximoASO: aso.proximoASO, medicoResponsavel: aso.medicoResponsavel, crmMedico: aso.crmMedico, data_criacao: aso.data_criacao, id_funcionario: aso.id_funcionario };
    }
    listar(): ASO[] {
        return db
        .prepare("SELECT * FROM aso").all() as ASO[];
    }
    buscarPorId(id: number): ASO | null {
        return (db.prepare("SELECT * FROM aso WHERE id = ?").get(id) as ASO) ?? null;
    }
    buscarPorFuncionario(id_funcionario: number): ASO[] {
        return db.prepare("SELECT * FROM aso WHERE id_funcionario = ?").all(id_funcionario) as ASO[];
    }
    buscarPorTipoExame(tipoExame: string): ASO[] {
        return db.prepare("SELECT * FROM aso WHERE tipoExame = ?").all(tipoExame) as ASO[];
    }
    buscarPorAptidao(aptidao: string): ASO[] {
        return db.prepare("SELECT * FROM aso WHERE aptidao = ?").all(aptidao) as ASO[];
    }
    atualizar(id: number, a:ASO): boolean {
        const resultado = db 
        .prepare("UPDATE aso SET dataEmissao = ?, tipoExame = ?, aptidao = ?, restricao = ?, proximoASO = ?, medicoResponsavel = ?, crmMedico = ?, data_criacao = ?, id_funcionario = ? WHERE id = ?")
        .run(a.dataEmissao, a.tipoExame, a.aptidao, a.restricao, a.proximoASO, a.medicoResponsavel, a.crmMedico, a.data_criacao, a.id_funcionario, id);

        return resultado.changes > 0;
    }
    buscarUltimoPorFuncionario(id_funcionario: number): ASO | null {

    return (db.prepare(` SELECT * FROM aso WHERE id_funcionario = ? ORDER BY date(dataEmissao) DESC, id DESC LIMIT 1`)
        .get(id_funcionario) as ASO) ?? null;
    }
}
