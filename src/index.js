// src/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Linha 6 em src/index.js
const { connectDB } = require('./config/db'); // Importa apenas a função de conexão

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar ao banco de dados
connectDB(); // Chama a função de conexão

// Middlewares Globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste/saúde
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API 4 Patas conectada com sucesso!' });
});

// ----- FUTURAMENTE, SUAS ROTAS PRINCIPAIS VIRÃO AQUI -----

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});