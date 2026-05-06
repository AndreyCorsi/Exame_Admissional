import { app } from "../app";
import { ASORepository } from "../repositories/ASORepository";

export function ASOController() {
  const repository = new ASORepository();

  app.get("/asos", (req, res) => {
    const { funcionarioId, tipoExame, aptidao, ultimoFuncionarioId } = req.query;

    if (ultimoFuncionarioId) {
      const aso = repository.buscarUltimoPorFuncionario(parseInt(ultimoFuncionarioId as string));
      if (!aso) return res.status(404).json({ erro: "ASO nao encontrado" });
      return res.json(aso);
    }

    if (funcionarioId) return res.json(repository.buscarPorFuncionario(parseInt(funcionarioId as string)));
    if (tipoExame) return res.json(repository.buscarPorTipoExame(tipoExame as string));
    if (aptidao) return res.json(repository.buscarPorAptidao(aptidao as string));

    res.json(repository.listar());
  });

  app.get("/asos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const aso = repository.buscarPorId(id);
    if (!aso) return res.status(404).json({ erro: "ASO nao encontrado" });
    res.json(aso);
  });

  app.post("/asos", (req, res) => {
    try {
      const {
        dataEmissao,
        tipoExame,
        aptidao,
        restricao,
        proximoASO,
        medicoResponsavel,
        crmMedico,
        data_criacao,
        id_funcionario,
      } = req.body;

      if (!dataEmissao) throw new Error("Data de emissao e obrigatoria");
      if (!tipoExame) throw new Error("Tipo do exame e obrigatorio");
      if (!aptidao) throw new Error("Aptidao e obrigatoria");
      if (!proximoASO) throw new Error("Proximo ASO e obrigatorio");
      if (!medicoResponsavel || medicoResponsavel.trim().length === 0) throw new Error("Medico responsavel e obrigatorio");
      if (!crmMedico || crmMedico.trim().length === 0) throw new Error("CRM do medico e obrigatorio");
      if (!id_funcionario) throw new Error("Funcionario e obrigatorio");

      const aso = repository.salvar({
        dataEmissao: dataEmissao as unknown as Date,
        tipoExame,
        aptidao,
        restricao: restricao ?? "",
        proximoASO: proximoASO as unknown as Date,
        medicoResponsavel,
        crmMedico,
        data_criacao: (data_criacao ?? new Date().toISOString()) as unknown as Date,
        id_funcionario,
      });

      res.status(201).json(aso);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/asos/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const atualizado = repository.atualizar(id, req.body);
      if (!atualizado) return res.status(404).json({ erro: "ASO nao encontrado" });
      res.json({ mensagem: "ASO atualizado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}
