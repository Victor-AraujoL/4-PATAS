/*
Navicat MySQL Data Transfer

Source Server         : 01.LOCALHOST
Source Server Version : 50530
Source Host           : localhost:3307
Source Database       : quatro_patas

Target Server Type    : MYSQL
Target Server Version : 50530
File Encoding         : 65001

Date: 2025-04-10 19:47:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `atendimento`
-- ----------------------------
DROP TABLE IF EXISTS `atendimento`;
CREATE TABLE `atendimento` (
  `IDATENDIMENTO` int(11) NOT NULL,
  `IDPET` int(11) DEFAULT NULL,
  `IDCOLABORADOR` int(11) DEFAULT NULL,
  `IDUSUARIO` int(11) DEFAULT NULL,
  `PESO` float DEFAULT NULL,
  `DATAHORA` datetime DEFAULT NULL,
  `MEDICAMENTO` text,
  `DIAGNOSTICO` text,
  `OBSERVACAO` text,
  `DATACAD` datetime DEFAULT NULL,
  PRIMARY KEY (`IDATENDIMENTO`),
  KEY `FK_ATENDIMENTO_USUARIO` (`IDUSUARIO`),
  KEY `FK_ATENDIMENTO_PET` (`IDPET`),
  KEY `FK_ATENDIMENTO_COLABORADOR` (`IDCOLABORADOR`),
  CONSTRAINT `FK_ATENDIMENTO_COLABORADOR` FOREIGN KEY (`IDCOLABORADOR`) REFERENCES `colaborador` (`IDCOLABORADOR`),
  CONSTRAINT `FK_ATENDIMENTO_PET` FOREIGN KEY (`IDPET`) REFERENCES `pet` (`IDPET`),
  CONSTRAINT `FK_ATENDIMENTO_USUARIO` FOREIGN KEY (`IDUSUARIO`) REFERENCES `usuario` (`IDUSUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of atendimento
-- ----------------------------

-- ----------------------------
-- Table structure for `colaborador`
-- ----------------------------
DROP TABLE IF EXISTS `colaborador`;
CREATE TABLE `colaborador` (
  `IDCOLABORADOR` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(255) DEFAULT NULL,
  `TELEFONE` varchar(20) DEFAULT NULL,
  `LOGRADOURO` varchar(255) DEFAULT NULL,
  `NUMERO` varchar(20) DEFAULT NULL,
  `COMPLEMENTO` varchar(100) DEFAULT NULL,
  `BAIRRO` varchar(100) DEFAULT NULL,
  `CIDADE` varchar(100) DEFAULT NULL,
  `ESTADO` varchar(2) DEFAULT 'MG',
  `ATIVO` varchar(1) DEFAULT 'S',
  `DATACAD` datetime DEFAULT NULL,
  PRIMARY KEY (`IDCOLABORADOR`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of colaborador
-- ----------------------------

-- ----------------------------
-- Table structure for `pet`
-- ----------------------------
DROP TABLE IF EXISTS `pet`;
CREATE TABLE `pet` (
  `IDPET` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(255) DEFAULT NULL,
  `ESPECIE` varchar(20) DEFAULT NULL,
  `RACA` varchar(255) DEFAULT NULL,
  `COR` varchar(50) DEFAULT NULL,
  `PORTE` varchar(1) DEFAULT NULL,
  `IDADE` varchar(50) DEFAULT NULL,
  `PESO` float(11,0) DEFAULT NULL,
  `CARACTERISTICAS` text,
  `SITUACAO_ADOCAO` varchar(1) DEFAULT 'S',
  `CASTRADO` varchar(1) DEFAULT 'N',
  `SEXO` varchar(1) DEFAULT NULL,
  `ORIGEM` varchar(50) DEFAULT NULL,
  `LOGRADOURO` varchar(255) DEFAULT NULL,
  `NUMERO` varchar(20) DEFAULT NULL,
  `COMPLEMENTO` varchar(100) DEFAULT NULL,
  `BAIRRO` varchar(100) DEFAULT NULL,
  `ESTADO` varchar(2) DEFAULT 'MG',
  `CIDADE` varchar(255) DEFAULT NULL,
  `TELEFONE` varchar(15) DEFAULT NULL,
  `RESPONSAVEL` varchar(255) DEFAULT NULL,
  `FOTO` text,
  `ATIVO` varchar(1) DEFAULT 'S',
  `DATACAD` datetime DEFAULT NULL,
  PRIMARY KEY (`IDPET`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pet
-- ----------------------------

-- ----------------------------
-- Table structure for `pet_vacina`
-- ----------------------------
DROP TABLE IF EXISTS `pet_vacina`;
CREATE TABLE `pet_vacina` (
  `IDPETVACINA` int(11) NOT NULL,
  `IDPET` int(11) NOT NULL,
  `IDVACINA` int(11) NOT NULL,
  `IDUSUARIO` int(11) DEFAULT NULL,
  `DATAVACINA` datetime DEFAULT NULL,
  `OBSERVACAO` text,
  `DATACAD` datetime DEFAULT NULL,
  PRIMARY KEY (`IDPETVACINA`),
  KEY `FK_PET_VACINA` (`IDVACINA`),
  KEY `FK_VACINA_PET` (`IDPET`),
  KEY `FK_VACINA_USUARIO` (`IDUSUARIO`),
  CONSTRAINT `FK_VACINA_USUARIO` FOREIGN KEY (`IDUSUARIO`) REFERENCES `usuario` (`IDUSUARIO`),
  CONSTRAINT `FK_PET_VACINA` FOREIGN KEY (`IDVACINA`) REFERENCES `vacina` (`IDVACINA`),
  CONSTRAINT `FK_VACINA_PET` FOREIGN KEY (`IDPET`) REFERENCES `pet` (`IDPET`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pet_vacina
-- ----------------------------

-- ----------------------------
-- Table structure for `usuario`
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `IDUSUARIO` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `LOGIN` varchar(255) DEFAULT NULL,
  `SENHA` varchar(20) DEFAULT NULL,
  `ADMIN` varchar(1) DEFAULT 'N',
  `ATIVO` varchar(1) DEFAULT 'S',
  `DATACAD` datetime DEFAULT NULL,
  PRIMARY KEY (`IDUSUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of usuario
-- ----------------------------

-- ----------------------------
-- Table structure for `vacina`
-- ----------------------------
DROP TABLE IF EXISTS `vacina`;
CREATE TABLE `vacina` (
  `IDVACINA` int(11) NOT NULL,
  `NOME` varchar(255) DEFAULT NULL,
  `ATIVO` varchar(1) DEFAULT 'S',
  `DATACAD` datetime DEFAULT NULL,
  PRIMARY KEY (`IDVACINA`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of vacina
-- ----------------------------
