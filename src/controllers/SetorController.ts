import { app } from "../app";
import { SetorRepository } from "../repositories/SetorRepository";

export function SetorController() {
  const repository = new SetorRepository();

  app.get("/setores", (req, res) => {
    const { empresaId } = req.query;

    if (empresaId) return res.json(repository.buscarPorEmpresa(parseInt(empresaId as string)));

    res.json(repository.listar());
  });

  app.get("/setores/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const setor = repository.buscarPorId(id);
    if (!setor) return res.status(404).json({ erro: "Setor nao encontrado" });
    res.json(setor);
  });

  app.post("/setores", (req, res) => {
    try {
      const { nome, descricao, data_criacao, id_empresa } = req.body;

      if (!nome || nome.trim().length === 0) throw new Error("Nome e obrigatorio");
      if (!descricao || descricao.trim().length === 0) throw new Error("Descricao e obrigatorio");
      if (!data_criacao) throw new Error("Data de criacao e obrigatorio");
      if (!id_empresa) throw new Error("Empresa e obrigatoria");

      const setor = repository.salvar({ nome, descricao, data_criacao, id_empresa });
      res.status(201).json(setor);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/setores/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const atualizado = repository.atualizar(id, req.body);
      if (!atualizado) return res.status(404).json({ erro: "Setor nao encontrado" });
      res.json({ mensagem: "Setor atualizado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.delete("/setores/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const removido = repository.remover(id);
    if (!removido) return res.status(404).json({ erro: "Setor nao encontrado" });
    res.status(204).send();
  });
}
