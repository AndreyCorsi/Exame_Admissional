import {Exame_Funcionario} from '../models/Exame_Funcionario';
import db from '../database/database';

export class ExameFuncionarioRepository {
    salvar(exameFuncionario: Exame_Funcionario): Exame_Funcionario {
        const resultado = db
        .prepare("INSERT INTO exame_funcionario (dataRealizacao, dataVencimento, resultado, situacao, medicoResponsavel, crmMedico, observacoes, id_funcionario, id_exame_ocupacional) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .run(exameFuncionario.dataRealizacao, exameFuncionario.dataVencimento, exameFuncionario.resultado, exameFuncionario.situacao, exameFuncionario.medicoResponsavel, exameFuncionario.crmMedico, exameFuncionario.observacoes, exameFuncionario.id_funcionario, exameFuncionario.id_exame_ocupacional);

        return { id: Number(resultado.lastInsertRowid), dataRealizacao: exameFuncionario.dataRealizacao, dataVencimento: exameFuncionario.dataVencimento, resultado: exameFuncionario.resultado, situacao: exameFuncionario.situacao, medicoResponsavel: exameFuncionario.medicoResponsavel, crmMedico: exameFuncionario.crmMedico, observacoes: exameFuncionario.observacoes, id_funcionario: exameFuncionario.id_funcionario, id_exame_ocupacional: exameFuncionario.id_exame_ocupacional };
    }
    listar(): Exame_Funcionario[] {
        return db
        .prepare("SELECT * FROM exame_funcionario").all() as Exame_Funcionario[];
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
    atualizar(id: number, e:Exame_Funcionario): boolean {
        const resultado = db 
        .prepare("UPDATE exame_funcionario SET dataRealizacao = ?, dataVencimento = ?, resultado = ?, situacao = ?, medicoResponsavel = ?, crmMedico = ?, observacoes = ?, id_funcionario = ?, id_exame_ocupacional = ? WHERE id = ?")
        .run(e.dataRealizacao, e.dataVencimento, e.resultado, e.situacao, e.medicoResponsavel, e.crmMedico, e.observacoes, e.id_funcionario, e.id_exame_ocupacional, id);

        return resultado.changes > 0;
    }
    remover(id: number): boolean {
        const resultado = db
        .prepare("DELETE FROM exame_funcionario WHERE id = ?")
        .run(id);

        return resultado.changes > 0;
    }  
}


