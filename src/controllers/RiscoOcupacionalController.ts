import { app } from "../app";
import { RiscoOcupacionalRepository } from "../repositories/Risco_Ocupacional";

export function RiscoOcupacionalController() {
  const repository = new RiscoOcupacionalRepository();

  app.get("/riscosOcupacionais", (req, res) => {
    const { cargoId, tipo, nivel } = req.query;

    if (cargoId) return res.json(repository.buscarPorCargo(parseInt(cargoId as string)));
    if (tipo) return res.json(repository.buscarPorTipo(tipo as string));
    if (nivel) return res.json(repository.buscarPorNivel(nivel as string));

    res.json(repository.listar());
  });

  app.get("/riscosOcupacionais/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const risco = repository.buscarPorId(id);
    if (!risco) return res.status(404).json({ erro: "Risco ocupacional nao encontrado" });
    res.json(risco);
  });

  app.post("/riscosOcupacionais", (req, res) => {
    try {
      const { descricao, tipo, nivel, id_cargo } = req.body;

      if (!descricao || descricao.trim().length === 0) throw new Error("Descricao e obrigatoria");
      if (!tipo || tipo.trim().length === 0) throw new Error("Tipo e obrigatorio");
      if (!nivel) throw new Error("Nivel e obrigatorio");
      if (!id_cargo) throw new Error("Cargo e obrigatorio");

      const risco = repository.salvar({ descricao, tipo, nivel, id_cargo });
      res.status(201).json(risco);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/riscosOcupacionais/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const atualizado = repository.atualizar(id, req.body);
      if (!atualizado) return res.status(404).json({ erro: "Risco ocupacional nao encontrado" });
      res.json({ mensagem: "Risco ocupacional atualizado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.delete("/riscosOcupacionais/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const removido = repository.remover(id);
    if (!removido) return res.status(404).json({ erro: "Risco ocupacional nao encontrado" });
    res.status(204).send();
  });
}
