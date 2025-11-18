-- Script para atualizar o banco de dados existente
-- Execute este script no seu banco de dados para corrigir as tabelas

USE quatro_patas2;

-- Adicionar AUTO_INCREMENT nas tabelas que faltam

-- Tabela atendimento
ALTER TABLE atendimento MODIFY IDATENDIMENTO INT(11) NOT NULL AUTO_INCREMENT;

-- Tabela pet_vacina
ALTER TABLE pet_vacina MODIFY IDPETVACINA INT(11) NOT NULL AUTO_INCREMENT;

-- Tabela vacina
ALTER TABLE vacina MODIFY IDVACINA INT(11) NOT NULL AUTO_INCREMENT;

-- Adicionar campos faltantes na tabela usuario
ALTER TABLE usuario
  ADD COLUMN IF NOT EXISTS TELEFONE VARCHAR(20) DEFAULT NULL AFTER SENHA,
  ADD COLUMN IF NOT EXISTS CPF VARCHAR(14) DEFAULT NULL AFTER TELEFONE,
  MODIFY SENHA VARCHAR(255) DEFAULT NULL;

-- Adicionar campo CEP na tabela colaborador
ALTER TABLE colaborador
  ADD COLUMN IF NOT EXISTS CEP VARCHAR(10) DEFAULT NULL AFTER TELEFONE;

-- Verificar as alterações
SELECT 'Tabelas atualizadas com sucesso!' AS Status;

-- Mostrar estrutura das tabelas atualizadas
DESCRIBE atendimento;
DESCRIBE pet_vacina;
DESCRIBE vacina;
DESCRIBE usuario;
DESCRIBE colaborador;
