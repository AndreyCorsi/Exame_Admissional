import express from "express";
import { EmpresaController } from "./controllers/EmpresaController";
import { SetorController } from "./controllers/SetorController";
import { CargoController } from "./controllers/CargoController";
import { FuncionarioController } from "./controllers/FuncionarioController";
import { RiscoOcupacionalController } from "./controllers/RiscoOcupacionalController";
import { ExameOcupacionalController } from "./controllers/ExameOcupacionalController";
import { ExameFuncionarioController } from "./controllers/ExameFuncionarioController";
import { ASOController } from "./controllers/ASOController";
import { AlertaController } from "./controllers/AlertaController";

export const app = express();

app.use(express.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (_req.method === "OPTIONS") { res.sendStatus(200); return; }
  next();
});
  
EmpresaController();
SetorController();
CargoController();
FuncionarioController();
RiscoOcupacionalController();
ExameOcupacionalController();
ExameFuncionarioController();
ASOController();
AlertaController();


app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});