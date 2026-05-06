import { app } from "../app";
import { ExameFuncionarioRepository } from "../repositories/Exame_FuncionarioRepository";

export function ExameFuncionarioController() {
  const repository = new ExameFuncionarioRepository();

  app.get("/exames-funcionarios", (req, res) => {
    const { funcionarioId, situacao } = req.query;

    if (funcionarioId) return res.json(repository.buscarPorFuncionario(parseInt(funcionarioId as string)));
    if (situacao) return res.json(repository.buscarPorSituacao(situacao as string));

    res.json(repository.listar());
  });

  app.get("/exames-funcionarios/vencidos", (_req, res) => {
    res.json(repository.listarVencidos());
  });

  app.get("/exames-funcionarios/proximos-vencimento", (req, res) => {
    const dias = req.query.dias ? parseInt(req.query.dias as string) : 30;
    res.json(repository.listarProximosAoVencimento(dias));
  });

  app.get("/exames-funcionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const exame = repository.buscarPorId(id);
    if (!exame) return res.status(404).json({ erro: "Exame do funcionario nao encontrado" });
    res.json(exame);
  });

  app.post("/exames-funcionarios", (req, res) => {
    try {
      const {
        dataRealizacao,
        dataVencimento,
        resultado,
        situacao,
        medicoResponsavel,
        crmMedico,
        observacoes,
        id_funcionario,
        id_exame_ocupacional,
      } = req.body;

      if (!dataRealizacao) throw new Error("Data de realizacao e obrigatoria");
      if (!dataVencimento) throw new Error("Data de vencimento e obrigatoria");
      if (!resultado || resultado.trim().length === 0) throw new Error("Resultado e obrigatorio");
      if (!situacao) throw new Error("Situacao e obrigatoria");
      if (!medicoResponsavel || medicoResponsavel.trim().length === 0) throw new Error("Medico responsavel e obrigatorio");
      if (!crmMedico || crmMedico.trim().length === 0) throw new Error("CRM do medico e obrigatorio");
      if (!id_funcionario) throw new Error("Funcionario e obrigatorio");
      if (!id_exame_ocupacional) throw new Error("Exame ocupacional e obrigatorio");

      const exame = repository.salvar({
        dataRealizacao: dataRealizacao as unknown as Date,
        dataVencimento: dataVencimento as unknown as Date,
        resultado,
        situacao,
        medicoResponsavel,
        crmMedico,
        observacoes,
        id_funcionario,
        id_exame_ocupacional,
      });

      res.status(201).json(exame);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.post("/exames-funcionarios/com-periodicidade", (req, res) => {
    try {
      const { periodicidadeMeses } = req.body;
      if (periodicidadeMeses <= 0) throw new Error("Periodicidade deve ser maior que zero");

      const exame = repository.salvarComPeriodicidade(req.body, periodicidadeMeses);
      res.status(201).json(exame);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/exames-funcionarios/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const atualizado = repository.atualizar(id, req.body);
      if (!atualizado) return res.status(404).json({ erro: "Exame do funcionario nao encontrado" });
      res.json({ mensagem: "Exame do funcionario atualizado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.delete("/exames-funcionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const removido = repository.remover(id);
    if (!removido) return res.status(404).json({ erro: "Exame do funcionario nao encontrado" });
    res.status(204).send();
  });
}
