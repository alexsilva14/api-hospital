CREATE DATABASE IF NOT EXISTS hospital;

USE hospital;

CREATE TABLE especialidades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

CREATE TABLE pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_nascimento DATE,
  telefone VARCHAR(20),
  email VARCHAR(100)
);

CREATE TABLE profissionais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especialidade_id INT,
  FOREIGN KEY (especialidade_id) REFERENCES especialidades(id)
);


CREATE TABLE atendimentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT,
  profissional_id INT,
  data DATETIME,
  observacoes TEXT,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
  FOREIGN KEY (profissional_id) REFERENCES profissionais(id)
);
