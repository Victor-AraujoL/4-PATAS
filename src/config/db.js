// src/config/database.js (ou db.js, como você chamou)
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: console.log, // Mantenha para debug inicial
    define: {
      timestamps: true,
      freezeTableName: true,
      // Se for usar sua coluna DATACAD como createdAt e não tiver updatedAt:
      // createdAt: 'DATACAD',
      // updatedAt: false,
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o MySQL (via Sequelize) estabelecida com sucesso.');
    // Não é ideal sincronizar modelos aqui para um DB existente,
    // a menos que você esteja em fase de desenvolvimento inicial e queira que o Sequelize crie/altere tabelas.
    // await sequelize.sync({ alter: true }); // CUIDADO: alter pode modificar seu DB
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados MySQL (via Sequelize):', error);
    process.exit(1);
  }
};

// Exportamos a instância do sequelize para ser usada nos models
// E a função de conexão para ser chamada no arquivo principal do servidor
module.exports = { sequelize, connectDB };