import { app } from "../app";
import { ExameOcupacionalRepository } from "../repositories/Exame_Ocupacional";

export function ExameOcupacionalController() {
  const repository = new ExameOcupacionalRepository();

  app.get("/examesOcupacionais", (req, res) => {
    const { riscoID, tipo } = req.query;

    if (riscoID) return res.json(repository.buscarPorRisco(parseInt(riscoID as string)));
    if (tipo) return res.json(repository.buscarPorTipo(tipo as string));

    res.json(repository.listar());
  });

  app.get("/examesOcupacionais/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const exame = repository.buscarPorId(id);
    if (!exame) return res.status(404).json({ erro: "Exame ocupacional nao encontrado" });
    res.json(exame);
  });

  app.post("/examesOcupacionais", (req, res) => {
    try {
      const { nome, tipo, periodicidadeMeses, id_risco_ocupacional, dataemissao } = req.body;

      if (!nome || nome.trim().length === 0) throw new Error("Nome é obrigatorio");
      if (!tipo) throw new Error("Tipo é obrigatorio");
      if (periodicidadeMeses <= 0) throw new Error("Periodicidade deve ser maior que zero");
      if (!id_risco_ocupacional) throw new Error("Risco é obrigatorio");
      if (!dataemissao) throw new Error("Data de emissao é obrigatoria");

      const exame = repository.salvar({
        nome,
        tipo,
        periodicidadeMeses,
        id_risco_ocupacional: id_risco_ocupacional,
        dataemissao: dataemissao as unknown as Date,
      });
      res.status(201).json(exame);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/examesOcupacionais/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const atualizado = repository.atualizar(id, req.body);
      if (!atualizado) return res.status(404).json({ erro: "Exame ocupacional nao encontrado" });
      res.json({ mensagem: "Exame ocupacional atualizado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.delete("/examesOcupacionais/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const removido = repository.remover(id);
    if (!removido) return res.status(404).json({ erro: "Exame ocupacional nao encontrado" });
    res.status(204).send();
  });
}
