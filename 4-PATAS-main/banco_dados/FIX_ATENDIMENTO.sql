-- =====================================================
-- SCRIPT PARA CORRIGIR O ERRO DE ATENDIMENTO
-- Execute este script no MySQL Workbench ou phpMyAdmin
-- =====================================================

USE quatro_patas2;

-- Adicionar AUTO_INCREMENT na tabela atendimento
ALTER TABLE atendimento MODIFY IDATENDIMENTO INT(11) NOT NULL AUTO_INCREMENT;

-- Adicionar AUTO_INCREMENT na tabela pet_vacina
ALTER TABLE pet_vacina MODIFY IDPETVACINA INT(11) NOT NULL AUTO_INCREMENT;

-- Adicionar AUTO_INCREMENT na tabela vacina
ALTER TABLE vacina MODIFY IDVACINA INT(11) NOT NULL AUTO_INCREMENT;

-- Adicionar campos faltantes na tabela usuario
ALTER TABLE usuario
  ADD COLUMN TELEFONE VARCHAR(20) DEFAULT NULL AFTER SENHA,
  ADD COLUMN CPF VARCHAR(14) DEFAULT NULL AFTER TELEFONE;

-- Aumentar tamanho do campo SENHA
ALTER TABLE usuario MODIFY SENHA VARCHAR(255) DEFAULT NULL;

-- Adicionar campo CEP na tabela colaborador
ALTER TABLE colaborador ADD COLUMN CEP VARCHAR(10) DEFAULT NULL AFTER TELEFONE;

-- Verificar se deu certo
SELECT 'TABELAS CORRIGIDAS COM SUCESSO!' AS Status;

-- Testar se o AUTO_INCREMENT está funcionando
SHOW CREATE TABLE atendimento;
