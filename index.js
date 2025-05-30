// Arquivo principal da aplicação
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { routes, testarConexao } = require('./src/index');

// Inicializa o app Express
const app = express();

// Configurações do app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usa as rotas definidas
app.use('/api', routes);

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Inicia o servidor após testar a conexão com o banco
async function iniciarServidor() {
  // Testa a conexão com o banco de dados
  const conexaoOk = await testarConexao();
  
  if (conexaoOk) {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } else {
    console.error('Falha ao iniciar o servidor devido a erro na conexão com o banco de dados.');
    process.exit(1);
  }
}

// Inicia o servidor
iniciarServidor();