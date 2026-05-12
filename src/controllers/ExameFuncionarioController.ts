import { app } from "../app";
import { ExameFuncionarioRepository } from "../repositories/Exame_FuncionarioRepository";

export function ExameFuncionarioController() {
  const repository = new ExameFuncionarioRepository();

  app.get("/examesFuncionarios", (req, res) => {
    const { funcionarioId, situacao } = req.query;
    if (funcionarioId) return res.json(repository.buscarPorFuncionario(parseInt(funcionarioId as string)));
    if (situacao) return res.json(repository.buscarPorSituacao(situacao as string));
    res.json(repository.listar());
  });

  app.get("/examesFuncionarios/vencidos", (_req, res) => {
    res.json(repository.listarVencidos());
  });

  app.get("/examesFuncionarios/proximosvencimento", (req, res) => {
    const dias = req.query.dias ? parseInt(req.query.dias as string) : 30;
    res.json(repository.listarProximosAoVencimento(dias));
  });

  app.get("/examesFuncionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const exame = repository.buscarPorId(id);
    if (!exame) return res.status(404).json({ erro: "Exame do funcionario nao encontrado" });
    res.json(exame);
  });

  app.post("/examesFuncionarios", (req, res) => {
    try {
      const {
        dataRealizacao, dataVencimento, resultado, situacao,
        medicoResponsavel, crmMedico, observacoes,
        id_funcionario, id_exame_ocupacional, tipo_exame,
      } = req.body;

      if (!id_funcionario) throw new Error("Funcionario e obrigatorio");
      if (!id_exame_ocupacional) throw new Error("Exame ocupacional e obrigatorio");

      const exame = repository.salvar({
        dataRealizacao: dataRealizacao || "",
        dataVencimento: dataVencimento || "",
        resultado: resultado || "",
        situacao: situacao || "PENDENTE",
        medicoResponsavel: medicoResponsavel || "",
        crmMedico: crmMedico || "",
        observacoes: observacoes || "",
        id_funcionario,
        id_exame_ocupacional,
        tipo_exame: tipo_exame || "Admissional",
      });

      res.status(201).json(exame);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.post("/examesFuncionarios/periodicidade", (req, res) => {
    try {
      const { periodicidadeMeses } = req.body;
      if (!periodicidadeMeses || periodicidadeMeses <= 0) throw new Error("Periodicidade deve ser maior que zero");
      const exame = repository.salvarComPeriodicidade(req.body, periodicidadeMeses);
      res.status(201).json(exame);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/examesFuncionarios/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const atual = repository.buscarPorId(id);
      if (!atual) return res.status(404).json({ erro: "Exame do funcionario nao encontrado" });

      const atualizado = repository.atualizar(id, {
        dataRealizacao: req.body.dataRealizacao ?? atual.dataRealizacao,
        dataVencimento: req.body.dataVencimento ?? atual.dataVencimento,
        resultado: req.body.resultado ?? atual.resultado,
        situacao: req.body.situacao ?? atual.situacao,
        medicoResponsavel: req.body.medicoResponsavel ?? atual.medicoResponsavel,
        crmMedico: req.body.crmMedico ?? atual.crmMedico,
        observacoes: req.body.observacoes ?? atual.observacoes,
        id_funcionario: req.body.id_funcionario ?? atual.id_funcionario,
        id_exame_ocupacional: req.body.id_exame_ocupacional ?? atual.id_exame_ocupacional,
        tipo_exame: req.body.tipo_exame ?? atual.tipo_exame,
      });
      if (!atualizado) return res.status(404).json({ erro: "Exame do funcionario nao encontrado" });
      res.json({ mensagem: "Exame do funcionario atualizado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.delete("/examesFuncionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const removido = repository.remover(id);
    if (!removido) return res.status(404).json({ erro: "Exame do funcionario nao encontrado" });
    res.status(204).send();
  });
}
