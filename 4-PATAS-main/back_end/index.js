// ========================================
// Quatro Patas HUB - Backend Server
// Sistema de Gerenciamento Veterinário
// ========================================

const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

// Configurar variáveis de ambiente PRIMEIRO
dotenv.config();

// Importar conexão do banco de dados
const db = require('./src/Config/db');

// Importar models com relacionamentos configurados ANTES das rotas
const models = require('./src/Models/index');

// Importar rotas da API
const PetRoutes = require('./src/Routes/petRoutes');
const ColaboradorRoutes = require('./src/Routes/colaboradorRoutes');
const VacinaRoutes = require('./src/Routes/vacinaRoutes');
const UsuarioRoutes = require('./src/Routes/usuarioRoutes');
const AtendimentoRoutes = require('./src/Routes/atendimentoRoutes');
const PDFRoutes = require('./src/Routes/pdfRoutes');

// Inicializar Express
const app = express();
const port = process.env.PORT || 3000;

// ========================================
// MIDDLEWARES
// ========================================

// CORS - Permitir requisições de qualquer origem
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Parser JSON
app.use(express.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../front_end')));

// ========================================
// SWAGGER - DOCUMENTAÇÃO DA API
// ========================================
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'QuatroPatas API',
      version: '1.0.0',
      description: 'API completa para gerenciamento de clínica veterinária - pets, colaboradores, vacinas, usuários e atendimentos',
      contact: {
        name: 'Suporte da API',
        email: 'suporte@petcare.com'
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Servidor de desenvolvimento',
      },
    ],
    tags: [
      {
        name: 'Pets',
        description: 'Operações relacionadas aos pets'
      },
      {
        name: 'Usuários',
        description: 'Operações relacionadas aos proprietários'
      },
      {
        name: 'Colaboradores',
        description: 'Operações relacionadas aos funcionários'
      },
      {
        name: 'Vacinas',
        description: 'Operações relacionadas ao estoque de vacinas'
      },
      {
        name: 'Atendimentos',
        description: 'Operações relacionadas aos atendimentos veterinários'
      },
      {
        name: 'PDFs e Relatórios',
        description: 'Geração de relatórios e documentos em PDF'
      }
    ]
  },
  apis: ['./src/Routes/*.js'], // caminho para seus arquivos de rotas
};

const specs = swaggerJSDoc(swaggerOptions);

// Rota da documentação Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'QuatroPatas API Documentation'
}));

// Rota para acessar o JSON da documentação
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// ========================================
// ROTAS DA API
// ========================================
app.use('/api/pets', PetRoutes);
app.use('/api/colaboradores', ColaboradorRoutes);
app.use('/api/vacinas', VacinaRoutes);
app.use('/api/usuarios', UsuarioRoutes);
app.use('/api/atendimentos', AtendimentoRoutes);
app.use('/api/pdf', PDFRoutes);

// ========================================
// ROTA RAIZ - Redireciona para o login
// ========================================
app.get('/', (req, res) => {
  res.redirect('/html/login.html');
});

// ========================================
// SINCRONIZAÇÃO DO BANCO DE DADOS
// ========================================
db.sync()
  .then(() => console.log('✅ Banco de dados sincronizado com sucesso!'))
  .catch((err) => console.error('❌ Erro ao sincronizar o banco de dados:', err));

// ========================================
// INICIAR SERVIDOR
// ========================================
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${port}`);
  console.log(`📚 Documentação Swagger disponível em http://0.0.0.0:${port}/api-docs`);
  console.log(`📄 JSON da documentação em http://0.0.0.0:${port}/api-docs.json`);
  console.log(`🌐 Frontend disponível em http://0.0.0.0:${port}/html/login.html`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
