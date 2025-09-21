const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const PetRoutes = require('./src/Routes/petRoutes');
const ColaboradorRoutes = require('./src/Routes/colaboradorRoutes');
const VacinaRoutes = require('./src/Routes/vacinaRoutes');
const UsuarioRoutes = require('./src/Routes/usuarioRoutes');
const AtendimentoRoutes = require('./src/Routes/atendimentoRoutes');
const PDFRoutes = require('./src/Routes/pdfRoutes');

const db = require('./src/config/db'); 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS simples para desenvolvimento (permitir chamadas do front local)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Configuração do Swagger
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

app.use(express.json());

// Rota do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'QuatroPatas API Documentation'
}));

// Rota para acessar o JSON da documentação
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// Suas rotas da API
app.use('/api/pets', PetRoutes); 
app.use('/api/colaboradores', ColaboradorRoutes);
app.use('/api/vacinas', VacinaRoutes);
app.use('/api/usuarios', UsuarioRoutes);
app.use('/api/atendimentos', AtendimentoRoutes);
app.use('/api/pdf', PDFRoutes);

// Rota raiz com informações da API
app.get('/', (req, res) => {
  res.json({
    message: 'QuatroPatas API está funcionando!',
    version: '1.0.0',
    documentation: `http://localhost:${port}/api-docs`,
    endpoints: {
      pets: `http://localhost:${port}/api/pets`,
      usuarios: `http://localhost:${port}/api/usuarios`,
      colaboradores: `http://localhost:${port}/api/colaboradores`,
      vacinas: `http://localhost:${port}/api/vacinas`,
      atendimentos: `http://localhost:${port}/api/atendimentos`,
      relatorios_pdf: `http://localhost:${port}/api/pdf`
    }
  });
});

db.sync()
  .then(() => console.log('✅ Banco de dados sincronizado com sucesso!'))
  .catch((err) => console.error('❌ Erro ao sincronizar o banco de dados:', err));

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log(`📚 Documentação Swagger disponível em http://localhost:${port}/api-docs`);
  console.log(`📄 JSON da documentação em http://localhost:${port}/api-docs.json`);
});

module.exports = app;
