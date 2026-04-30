# 🏥 Exame Admissional — Sistema de Gestão de Saúde Ocupacional

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

> **Sistema backend completo para gestão de riscos ocupacionais, controle de exames (PCMSO) e monitoramento da saúde do trabalhador — com conformidade às normas regulamentadoras brasileiras (NR-7, NR-9, NR-15).**

</div>

---

## 🎯 Sobre o Projeto

O **Exame Admissional** é uma API REST desenvolvida para digitalizar e automatizar o fluxo do **Exame Admissional e Periódico** dentro de empresas, integrando o controle de funcionários, cargos, setores, riscos ocupacionais, exames e emissão de ASO (Atestado de Saúde Ocupacional).

O sistema elimina processos manuais, garante rastreabilidade completa via auditoria e emite **alertas automáticos** para exames próximos ao vencimento — protegendo a empresa de passivos trabalhistas.

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura em camadas bem definida, separando responsabilidades e facilitando manutenção e escalabilidade:

```
src/
├── model/          # Entidades e interfaces TypeScript (tipagem do domínio)
├── database/       # Configuração e conexão com SQLite via Better-SQLite3
├── repository/     # Queries SQL, criação de tabelas e acesso a dados
└── controller/     # Rotas HTTP, validações e respostas da API REST
```

| Camada | Responsabilidade |
|---|---|
| **Model** | Define a estrutura das entidades com tipagem estática TypeScript |
| **Database** | Gerencia a conexão com o banco SQLite e inicialização das tabelas |
| **Repository** | Encapsula toda a lógica de persistência e consulta de dados |
| **Controller** | Expõe endpoints REST, valida entradas e retorna respostas padronizadas |

---

## ⚙️ Stack Tecnológica

| Tecnologia | Uso no Projeto |
|---|---|
| **Node.js** | Ambiente de execução JavaScript no servidor |
| **TypeScript** | Tipagem estática, garantindo segurança e autocompletion no desenvolvimento |
| **Express** | Framework para criação e organização das rotas HTTP da API REST |
| **Better-SQLite3** | Banco de dados SQLite local — leve, sem dependências externas |
| **ts-node** | Execução direta de TypeScript sem etapa de compilação manual |
| **Nodemon** | Hot reload automático ao salvar arquivos durante o desenvolvimento |

---

## 📦 Módulos do Sistema

### 🏢 Empresa
- Cadastrar, buscar, atualizar, listar e deletar empresas

### 🗂️ Setor
- Cadastrar, buscar por ID, listar por empresa e atualizar setores

### 💼 Cargo
- CRUD completo com busca por **CBO** e listagem por setor

### 👷 Funcionário
- Gestão completa com filtros por empresa, cargo, setor e status
- Controle de matrícula e atualização de status (ativo/inativo/afastado)

### ⚠️ Riscos Ocupacionais
- Cadastro de riscos por cargo com classificação por **tipo** e **nível**
- Conformidade com levantamento de agentes do **PPRA/PGR**

### 🔬 Exames Ocupacionais
- Catálogo de exames vinculados a riscos
- Suporte a múltiplos tipos (admissional, periódico, demissional, retorno)

### 📋 Exames por Funcionário
- Registro de exames realizados com cálculo automático de **data de vencimento**
- Listagem de exames **vencidos** e **próximos ao vencimento**
- Atualização de resultados e situação

### 📄 ASO — Atestado de Saúde Ocupacional
- Emissão e gerenciamento de ASOs por funcionário
- Filtros por tipo de exame e aptidão (apto/inapto/apto com restrições)
- **Geração de ASO em PDF**
- Busca do último ASO emitido por funcionário

### 🔔 Alertas
- Geração automática de alertas por vencimento
- Filtros por funcionário, nível de criticidade e status de resolução
- Cálculo de dias restantes para o vencimento

### 📊 Auditoria
- Registro automático de todas as ações no sistema
- Rastreabilidade por tabela, tipo de ação e período
- Conformidade com requisitos de governança e compliance

---

## 🚀 Como Executar

```bash
# Clone o repositório
git clone https://github.com/AndreyCorsi/Exame_Admissional.git
cd Exame_Admissional

# Instale as dependências
npm install

# Inicie em modo desenvolvimento (com hot reload)
npm run dev
```

> O banco de dados SQLite é criado automaticamente na primeira execução. Nenhuma configuração externa necessária.

---

## 📡 Endpoints — Exemplo

```http
POST   /empresa              # Cadastrar empresa
GET    /empresa/:id          # Buscar empresa por ID
PUT    /empresa/:id          # Atualizar empresa
GET    /empresa              # Listar todas as empresas
DELETE /empresa/:id          # Deletar empresa

POST   /funcionario          # Cadastrar funcionário
GET    /funcionario/:id      # Buscar por ID
GET    /funcionario/empresa/:empresaId  # Listar por empresa

POST   /aso                  # Emitir ASO
GET    /aso/funcionario/:id  # Listar ASOs do funcionário
GET    /aso/:id/pdf          # Gerar ASO em PDF

GET    /alerta/vencendo      # Listar exames próximos ao vencimento
GET    /exame-funcionario/vencidos  # Listar exames já vencidos
```

---

## 🧠 Destaques Técnicos

- ✅ **Tipagem forte** em todas as camadas com TypeScript — zero `any`
- ✅ **Separação de responsabilidades** clara entre Model, Repository, Controller e Database
- ✅ **Cálculo automático** de vencimento de exames e geração de alertas
- ✅ **Auditoria completa** de operações para fins de compliance
- ✅ **Geração de PDF** para o ASO diretamente pela API
- ✅ **Zero configuração de banco** — SQLite integrado e portátil
- ✅ **DX otimizado** com Nodemon + ts-node para desenvolvimento ágil

---

## 📌 Contexto Regulatório

O sistema foi projetado considerando as principais normas regulamentadoras do **Ministério do Trabalho e Emprego (MTE)**:

- **NR-7** — Programa de Controle Médico de Saúde Ocupacional (PCMSO)
- **NR-9** — Avaliação e controle das exposições ocupacionais a agentes físicos, químicos e biológicos
- **NR-15** — Atividades e operações insalubres

---

<div align="center">

Desenvolvido com | Node.js + TypeScript + Express + SQLite

</div>
