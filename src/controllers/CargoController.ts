import { app } from "../app";
import { CargoRepository } from "../repositories/CargoRepository";

export function CargoController() {
  const repository = new CargoRepository();

  app.get("/cargos", (req, res) => {
    const { setorId, codigoCBO } = req.query;
    if (setorId) return res.json(repository.buscarPorSetor(parseInt(setorId as string)));
    if (codigoCBO) {
      const cargo = repository.buscarPorCodigoCBO(codigoCBO as string);
      if (!cargo) return res.status(404).json({ erro: "Cargo nao encontrado" });
      return res.json(cargo);
    }
    res.json(repository.listar());
  });

  app.get("/cargos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const cargo = repository.buscarPorId(id);
    if (!cargo) return res.status(404).json({ erro: "Cargo nao encontrado" });
    res.json(cargo);
  });

  app.post("/cargos", (req, res) => {
    try {
      const { nome, codigoCBO, descricaoAtividades, descricao, id_setor } = req.body;
      if (!nome || nome.trim().length === 0) throw new Error("Nome e obrigatorio");

      const cargo = repository.salvar({
        nome,
        codigoCBO: codigoCBO || `CBO-${Date.now()}`,
        descricaoAtividades: descricaoAtividades || descricao || "",
        id_setor: id_setor || null,
      });
      res.status(201).json(cargo);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/cargos/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const atualizado = repository.atualizar(id, req.body);
      if (!atualizado) return res.status(404).json({ erro: "Cargo nao encontrado" });
      res.json({ mensagem: "Cargo atualizado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.delete("/cargos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const removido = repository.remover(id);
    if (!removido) return res.status(404).json({ erro: "Cargo nao encontrado" });
    res.status(204).send();
  });
}
