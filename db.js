// src/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Criação da instância do Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco de dados
  process.env.DB_USER, // Usuário do banco
  process.env.DB_PASSWORD, // Senha do banco
  {
    host: process.env.DB_HOST, // Host do banco de dados
    dialect: 'mysql', // Tipo de banco de dados
    logging: false // Para desabilitar os logs SQL no console
  }
);

try {
  sequelize.authenticate();
  console.log('Conexão com o banco de dados foi bem-sucedida!');
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error);
}

module.exports = sequelize;
