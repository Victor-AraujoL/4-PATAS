-- =====================================================
-- SCRIPT DE CORREÇÃO DO BANCO DE DADOS
-- =====================================================
-- Este script corrige todos os problemas do banco de dados
-- Execute este script COMPLETO no MySQL Workbench ou phpMyAdmin
-- =====================================================

USE quatro_patas2;

-- 1. Adicionar AUTO_INCREMENT na tabela atendimento
ALTER TABLE atendimento MODIFY IDATENDIMENTO INT(11) NOT NULL AUTO_INCREMENT;

-- 2. Adicionar AUTO_INCREMENT na tabela pet_vacina
ALTER TABLE pet_vacina MODIFY IDPETVACINA INT(11) NOT NULL AUTO_INCREMENT;

-- 3. Adicionar AUTO_INCREMENT na tabela vacina
ALTER TABLE vacina MODIFY IDVACINA INT(11) NOT NULL AUTO_INCREMENT;

-- 4. Verificar se as colunas TELEFONE e CPF existem na tabela usuario
-- Se não existirem, serão adicionadas
SET @dbname = 'quatro_patas2';
SET @tablename = 'usuario';
SET @columnname1 = 'TELEFONE';
SET @columnname2 = 'CPF';

-- Adicionar TELEFONE se não existir
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname1)
  ) > 0,
  'SELECT 1',
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname1, ' VARCHAR(20) DEFAULT NULL AFTER SENHA')
));
PREPARE alterStatement FROM @preparedStatement;
EXECUTE alterStatement;
DEALLOCATE PREPARE alterStatement;

-- Adicionar CPF se não existir
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname2)
  ) > 0,
  'SELECT 1',
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname2, ' VARCHAR(14) DEFAULT NULL AFTER TELEFONE')
));
PREPARE alterStatement FROM @preparedStatement;
EXECUTE alterStatement;
DEALLOCATE PREPARE alterStatement;

-- 5. Aumentar tamanho do campo SENHA
ALTER TABLE usuario MODIFY SENHA VARCHAR(255) DEFAULT NULL;

-- 6. Verificar e adicionar campo CEP na tabela colaborador se não existir
SET @tablename = 'colaborador';
SET @columnname = 'CEP';

SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  'SELECT 1',
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(10) DEFAULT NULL AFTER TELEFONE')
));
PREPARE alterStatement FROM @preparedStatement;
EXECUTE alterStatement;
DEALLOCATE PREPARE alterStatement;

-- =====================================================
-- VERIFICAÇÃO FINAL
-- =====================================================

-- Mostrar estrutura da tabela atendimento (verifique se tem AUTO_INCREMENT)
SELECT 'ESTRUTURA DA TABELA ATENDIMENTO:' AS Info;
SHOW CREATE TABLE atendimento;

-- Mostrar estrutura da tabela pet_vacina (verifique se tem AUTO_INCREMENT)
SELECT 'ESTRUTURA DA TABELA PET_VACINA:' AS Info;
SHOW CREATE TABLE pet_vacina;

-- Mostrar estrutura da tabela vacina (verifique se tem AUTO_INCREMENT)
SELECT 'ESTRUTURA DA TABELA VACINA:' AS Info;
SHOW CREATE TABLE vacina;

-- Mostrar estrutura da tabela usuario (verifique TELEFONE, CPF e SENHA)
SELECT 'ESTRUTURA DA TABELA USUARIO:' AS Info;
DESCRIBE usuario;

-- Mostrar estrutura da tabela colaborador (verifique CEP)
SELECT 'ESTRUTURA DA TABELA COLABORADOR:' AS Info;
DESCRIBE colaborador;

SELECT '=====================================' AS '';
SELECT 'SCRIPT EXECUTADO COM SUCESSO!' AS Status;
SELECT 'Agora teste o cadastro de atendimento novamente' AS Instrucao;
SELECT '=====================================' AS '';
