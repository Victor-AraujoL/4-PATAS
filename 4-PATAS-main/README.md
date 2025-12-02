# 🐾 Quatro Patas- Sistema de Gerenciamento Veterinário

Sistema completo de gerenciamento para a **Associação Quatro Patas** de Divinolândia de Minas/MG, desenvolvido para facilitar o controle de pets, atendimentos, vacinas e colaboradores.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Deploy](#deploy)
- [API Documentation](#api-documentation)

## 🎯 Sobre o Projeto

O **Quatro Patas Hub** é uma solução completa para gerenciamento de clínicas e associações veterinárias. O sistema permite cadastro de pets, proprietários, colaboradores, controle de estoque de vacinas, registro de atendimentos e geração de relatórios em PDF.

### Problema que Resolve

- Centralização de informações de pets e proprietários
- Histórico completo de atendimentos veterinários
- Controle de estoque de vacinas
- Gestão de colaboradores e usuários
- Geração automática de relatórios e fichas

## ⚡ Funcionalidades

### Gestão de Pets
- ✅ Cadastro completo de pets com foto
- ✅ Busca e filtros avançados
- ✅ Histórico de atendimentos por pet
- ✅ Informações de proprietário vinculadas

### Gestão de Usuários
- ✅ Cadastro de proprietários
- ✅ Sistema de login e autenticação
- ✅ Perfis de usuário (Admin/Comum)
- ✅ Busca com validação de CPF

### Gestão de Colaboradores
- ✅ Cadastro de veterinários e funcionários
- ✅ Controle de CRMV
- ✅ Endereço completo com busca por CEP
- ✅ Status ativo/inativo

### Gestão de Vacinas
- ✅ Controle de estoque
- ✅ Registro de lotes e validade
- ✅ Alertas de vencimento
- ✅ Histórico de aplicações

### Atendimentos
- ✅ Registro completo de consultas
- ✅ Prescrições e observações
- ✅ Vinculação pet/colaborador/proprietário
- ✅ Histórico completo

### Relatórios
- ✅ Geração de PDFs
- ✅ Fichas de atendimento
- ✅ Relatórios de vacinas aplicadas

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** v18+ - Runtime JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para banco de dados
- **MySQL** - Banco de dados relacional
- **Swagger** - Documentação automática da API
- **PDFKit** - Geração de relatórios em PDF
- **Bcrypt** - Criptografia de senhas
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilização customizada
- **JavaScript Vanilla** - Lógica e interações
- **Bootstrap 5** - Framework CSS responsivo
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Poppins)

### Infraestrutura
- **Railway** - Plataforma de deploy
- **Git/GitHub** - Controle de versão

## 📦 Pré-requisitos

- Node.js >= 18.x
- MySQL 8.0+
- NPM ou Yarn
- Git

## 🔧 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/paulovictornt/pata-care-hub.git
cd pata-care-hub
```

### 2. Configure o banco de dados

```bash
# Crie o banco de dados MySQL
CREATE DATABASE quatro_patas2;

# Importe o schema (se houver arquivo SQL)
mysql -u root -p quatro_patas2 < banco_dados/schema.sql
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `back_end/`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=quatro_patas2
DB_PORT=3306
PORT=3000
```

### 4. Instale as dependências

```bash
npm install
```

Este comando automaticamente instala as dependências do backend.

### 5. Execute o projeto

```bash
npm start
```

O servidor estará disponível em:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api
- **Swagger Docs**: http://localhost:3000/api-docs

## 📁 Estrutura do Projeto

```
pata-care-hub/
├── back_end/
│   ├── src/
│   │   ├── Config/       # Configuração do banco de dados
│   │   ├── Models/       # Modelos Sequelize
│   │   ├── Routes/       # Rotas da API
│   │   ├── Controller/   # Controladores
│   │   └── services/     # Serviços de negócio
│   ├── index.js          # Entrada do servidor
│   ├── package.json
│   └── .env             # Variáveis de ambiente (não versionado)
│
├── front_end/
│   ├── html/            # Páginas HTML
│   ├── css/             # Estilos
│   └── assets/          # Imagens e recursos
│
├── banco_dados/         # Scripts SQL
├── package.json         # Configuração raiz
├── railway.json         # Config do Railway
├── nixpacks.toml        # Config de build
├── Procfile             # Config alternativa de deploy
└── README.md

```

## 🌐 Deploy

O projeto está configurado para deploy automático no Railway.

### Variáveis de Ambiente no Railway

Configure as seguintes variáveis:

```
DB_HOST=seu-host-railway.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=sua-senha-railway
DB_NAME=quatro_patas2
DB_PORT=porta-railway
PORT=3000
```

### Deploy Automático

1. Push para o repositório GitHub
2. Railway detecta automaticamente e faz o build
3. Aplicação disponível na URL fornecida pelo Railway

Mais detalhes em: [DEPLOY.md](DEPLOY.md)

## 📚 API Documentation

A documentação completa da API está disponível via Swagger:

- **Local**: http://localhost:3000/api-docs
- **Produção**: `https://seu-app.railway.app/api-docs`

### Principais Endpoints

#### Pets
- `GET /api/pets` - Lista todos os pets
- `POST /api/pets` - Cria novo pet
- `PUT /api/pets/:id` - Atualiza pet
- `DELETE /api/pets/:id` - Remove pet

#### Usuários
- `POST /api/usuarios/login` - Login de usuário
- `GET /api/usuarios` - Lista usuários
- `POST /api/usuarios` - Cria novo usuário

#### Colaboradores
- `GET /api/colaboradores` - Lista colaboradores
- `POST /api/colaboradores` - Cria colaborador
- `PUT /api/colaboradores/:id` - Atualiza colaborador

#### Vacinas
- `GET /api/vacinas` - Lista vacinas
- `POST /api/vacinas` - Registra vacina
- `GET /api/vacinas/search` - Busca vacinas

#### Atendimentos
- `GET /api/atendimentos` - Lista atendimentos
- `POST /api/atendimentos` - Registra atendimento
- `GET /api/atendimentos/:id` - Detalhes do atendimento

#### Relatórios
- `GET /api/pdf/ficha-atendimento/:id` - Gera PDF de atendimento

## 👥 Autores

Projeto desenvolvido como Trabalho de Conclusão de Curso.

## 📄 Licença

Este projeto é de uso acadêmico.

---

**Desenvolvido com ❤️ para a Associação Quatro Patas**
