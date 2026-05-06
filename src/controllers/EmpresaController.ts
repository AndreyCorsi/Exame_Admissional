import { app } from "../app";
import { EmpresaRepository } from "../repositories/EmpresaRepository";

export function EmpresaController() {
  const repository = new EmpresaRepository();

  app.get("/empresas", (req, res) => {
    const { razaoSocial } = req.query;

    if (razaoSocial) {
      const empresa = repository.buscarPorRazaoSocial(razaoSocial as string);
      if (!empresa) return res.status(404).json({ erro: "Empresa nao encontrada" });
      return res.json(empresa);
    }

    res.json(repository.listar());
  });

  app.get("/empresas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const empresa = repository.buscarPorId(id);
    if (!empresa) return res.status(404).json({ erro: "Empresa nao encontrada" });
    res.json(empresa);
  });

  app.post("/empresas", (req, res) => {
    try {
      const { razaoSocial, cnpj, cnae, totalFuncionarios, data_criacao, data_atualizacao } = req.body;

      if (!razaoSocial || razaoSocial.trim().length === 0) throw new Error("Razao social e obrigatoria");
      if (!cnpj || cnpj.trim().length === 0) throw new Error("CNPJ e obrigatorio");
      if (!cnae || cnae.trim().length === 0) throw new Error("CNAE e obrigatorio");
      if (totalFuncionarios < 0) throw new Error("Total de funcionarios nao pode ser negativo");

      const empresa = repository.salvar({
        razaoSocial,
        cnpj,
        cnae,
        totalFuncionarios,
        data_criacao: (data_criacao ?? new Date().toISOString()) as unknown as Date,
        data_atualizacao: (data_atualizacao ?? new Date().toISOString()) as unknown as Date,
      });

      res.status(201).json(empresa);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/empresas/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const atualizado = repository.atualizar(id, req.body);
      if (!atualizado) return res.status(404).json({ erro: "Empresa nao encontrada" });
      res.json({ mensagem: "Empresa atualizada com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.delete("/empresas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const removido = repository.remover(id);
    if (!removido) return res.status(404).json({ erro: "Empresa nao encontrada" });
    res.status(204).send();
  });
}
