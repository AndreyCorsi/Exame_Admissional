CREATE TABLE IF NOT EXISTS empresa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    razaoSocial VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    cnae VARCHAR(20) NOT NULL,
    total_funcionarios INT NOT NULL,
    data_criacao DATETIME,
    data_atualizacao DATETIME
);

CREATE TABLE IF NOT EXISTS cargo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255) NOT NULL,
    codigoCBO VARCHAR(20) NOT NULL UNIQUE,
    descricaoAtividades VARCHAR(255) NOT NULL,
    id_setor INT,
    FOREIGN KEY (id_setor) REFERENCES setor(id)
);

CREATE TABLE IF NOT EXISTS setor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255) NOT NULL,
    id_empresa INT,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id)
);

CREATE TABLE IF NOT EXISTS funcionario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    dataAdmissao DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    data_criacao DATETIME,
    data_atualizacao DATETIME,
    id_cargo INT,
    id_setor INT,
    FOREIGN KEY (id_cargo) REFERENCES cargo(id),
    FOREIGN KEY (id_setor) REFERENCES setor(id)
);

CREATE TABLE IF NOT EXISTS exame_funcionario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataRealizacao DATE NOT NULL,
    dataVencimento DATE NOT NULL,
    resultado VARCHAR(255) NOT NULL,
    situacao VARCHAR(20) NOT NULL,
    medicoResponsavel VARCHAR(255) NOT NULL,
    crmMedico VARCHAR(20) NOT NULL,
    observacoes VARCHAR(255) NOT NULL,
    id_funcionario INT,
    id_exame_ocupacional INT,
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id),
    FOREIGN KEY (id_exame_ocupacional) REFERENCES exame_ocupacional(id)
);

CREATE TABLE IF NOT EXISTS exame_ocupacional (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    periodicidadeMeses INT NOT NULL,
    id_risco INT,
    validade date NOT NULL,
    FOREIGN KEY (id_risco) REFERENCES risco(id)
);

CREATE TABLE IF NOT EXISTS risco_ocupacional (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    nivel VARCHAR(20) NOT NULL,
    id_cargo INT,
    FOREIGN KEY (id_cargo) REFERENCES cargo(id)
);

CREATE TABLE IF NOT EXISTS ASO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataEmissao DATE NOT NULL,
    tipoExame VARCHAR(20) NOT NULL,
    aptidao VARCHAR(20) NOT NULL,
    restricao VARCHAR(255) NOT NULL,
    proximoASO DATE NOT NULL,
    medicoResponsavel VARCHAR(255) NOT NULL,
    crmMedico VARCHAR(20) NOT NULL,
    data_criacao DATETIME,
    id_funcionario INT,
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id)
);

CREATE TABLE IF NOT EXISTS Alerta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataVencimento DATE NOT NULL,
    diasParaVencer INT NOT NULL,
    nivel VARCHAR(20) NOT NULL,
    resolvido BOOLEAN NOT NULL,
    id_funcionario INT,
    id_exame_ocupacional INT,
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id),
    FOREIGN KEY (id_exame_ocupacional) REFERENCES exame_ocupacional(id)
);