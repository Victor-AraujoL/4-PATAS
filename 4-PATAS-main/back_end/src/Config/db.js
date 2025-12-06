// src/Config/db.js
const { Sequelize } = require('sequelize');
const path = require('path');
// Carrega .env a partir da pasta do backend, independente do cwd
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Criação da instância do Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco de dados
  process.env.DB_USER, // Usuário do banco
  process.env.DB_PASSWORD, // Senha do banco
  {
    host: process.env.DB_HOST, // Host do banco de dados
    port: process.env.DB_PORT || 3306, // Porta do banco de dados
    dialect: 'mysql', // Tipo de banco de dados
    logging: false, // Desabilita logs SQL no console
    dialectOptions: {
      connectTimeout: 60000 // Timeout de 60 segundos
    }
  }
);

// Validação explícita da conexão (assíncrona)
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();

module.exports = sequelize;
