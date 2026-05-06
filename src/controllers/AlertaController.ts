import { app } from "../app";
import { AlertaRepository } from "../repositories/AlertaRepository";

export function AlertaController() {
  const repository = new AlertaRepository();

  app.get("/alertas", (req, res) => {
    const { funcionarioId, nivel, pendentes } = req.query;

    if (pendentes === "true") return res.json(repository.listarPendentes());
    if (funcionarioId) return res.json(repository.buscarPorFuncionario(parseInt(funcionarioId as string)));
    if (nivel) return res.json(repository.buscarPorNivel(nivel as string));

    res.json(repository.listar());
  });

  app.get("/alertas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const alerta = repository.buscarPorId(id);
    if (!alerta) return res.status(404).json({ erro: "Alerta nao encontrado" });
    res.json(alerta);
  });

  app.post("/alertas", (req, res) => {
    try {
      const { dataVencimento, diasParaVencer, nivel, resolvido, id_funcionario, id_exame_ocupacional } = req.body;

      if (!dataVencimento) throw new Error("Data de vencimento e obrigatoria");
      if (diasParaVencer < 0) throw new Error("Dias para vencer nao pode ser negativo");
      if (!nivel) throw new Error("Nivel e obrigatorio");
      if (!id_funcionario) throw new Error("Funcionario e obrigatorio");
      if (!id_exame_ocupacional) throw new Error("Exame ocupacional e obrigatorio");

      const alerta = repository.salvar({
        dataVencimento: dataVencimento as unknown as Date,
        diasParaVencer,
        nivel,
        resolvido: resolvido ?? false,
        id_funcionario,
        id_exame_ocupacional,
      });

      res.status(201).json(alerta);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/alertas/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const atualizado = repository.atualizar(id, req.body);
      if (!atualizado) return res.status(404).json({ erro: "Alerta nao encontrado" });
      res.json({ mensagem: "Alerta atualizado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.patch("/alertas/:id/resolver", (req, res) => {
    const id = parseInt(req.params.id);
    const resolvido = repository.resolver(id);
    if (!resolvido) return res.status(404).json({ erro: "Alerta nao encontrado" });
    res.json({ mensagem: "Alerta resolvido com sucesso" });
  });
}
