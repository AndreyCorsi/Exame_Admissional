import { app } from "../app";
import { FuncionarioRepository } from "../repositories/FuncionarioRepository";

export function FuncionarioController() {
  const repository = new FuncionarioRepository();

  app.get("/funcionarios", (req, res) => {
    const { matricula, empresaId, cargoId, setorId, status } = req.query;

    if (matricula) {
      const funcionario = repository.buscarPorMatricula(matricula as string);
      if (!funcionario) return res.status(404).json({ erro: "Funcionario nao encontrado" });
      return res.json(funcionario);
    }
    if (setorId) return res.json(repository.buscarPorSetor(parseInt(setorId as string)));
    if (status) return res.json(repository.buscarPorStatus(status as string));

    res.json(repository.listar());
  });

  app.get("/funcionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const funcionario = repository.buscarPorId(id);
    if (!funcionario) return res.status(404).json({ erro: "Funcionario nao encontrado" });
    res.json(funcionario);
  });

  app.post("/funcionarios", (req, res) => {
    try {
      const { matricula, nome, dataAdmissao, status, data_criacao, data_atualizacao, id_cargo, id_setor } = req.body;

      if (!matricula || matricula.trim().length === 0) throw new Error("Matricula e obrigatoria");
      if (!nome || nome.trim().length === 0) throw new Error("Nome e obrigatorio");
      if (!dataAdmissao) throw new Error("Data de admissao e obrigatoria");
      if (!status) throw new Error("Status e obrigatorio");
      if (!id_cargo) throw new Error("Cargo e obrigatorio");
      if (!id_setor) throw new Error("Setor e obrigatorio");

      const funcionario = repository.salvar({
        matricula,
        nome,
        dataAdmissao: dataAdmissao as unknown as Date,
        status,
        data_criacao: (data_criacao ?? new Date().toISOString()) as unknown as Date,
        data_atualizacao: (data_atualizacao ?? new Date().toISOString()) as unknown as Date,
        id_cargo,
        id_setor,
      });

      res.status(201).json(funcionario);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(500).json({ erro: mensagem });
    }
  });

  app.put("/funcionarios/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const atualizado = repository.atualizar(id, req.body);
      if (!atualizado) return res.status(404).json({ erro: "Funcionario nao encontrado" });
      res.json({ mensagem: "Funcionario atualizado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(500).json({ erro: mensagem });
    }
  });

  app.delete("/funcionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const removido = repository.remover(id);
    if (!removido) return res.status(404).json({ erro: "Funcionario nao encontrado" });
    res.status(204).send();
  });
}
