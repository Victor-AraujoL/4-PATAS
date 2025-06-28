# Sistema de Gerenciamento - Associação Quatro Patas

Este projeto foi desenvolvido para a ONG Associação Quatro Patas, localizada em Divinolândia de Minas/MG. 
O sistema tem como objetivo facilitar o gerenciamento de informações internas da ONG, como o cadastro e controle de animais, atendimentos, vacinas e colaboradores.

FUNCIONALIDADES PRINCIPAIS

- Cadastro, edição e listagem de pets
- Registro e histórico de atendimentos
- Cadastro e controle de vacinas
- Gerenciamento de colaboradores
- Acesso restrito por login de usuários

TECNOLOGIAS UTILIZADAS

- Node.js + Express
- Prisma ORM
- MySQL
- HTML
- Visual Studio Code
- Insomnia (testes de API)

REQUISITOS PARA RODAR O PROJETO

- Node.js instalado
- MySQL instalado e rodando
- Visual Studio Code (ou outro editor de sua preferência)
- Insomnia (ou outro cliente REST)

PASSO A PASSO PARA RODAR O PROJETO

1. Clonar o repositório:

git clone [https://github.com/seu-usuario/seu-projeto.git](https://github.com/Victor-AraujoL/4-PATAS.git)
cd seu-projeto

2. Instalar as dependências:

npm install

3. Criar o banco de dados:

Acesse o MySQL e crie o banco com o comando:

CREATE DATABASE quatro_patas2;

Depois, execute o script banco.sql incluído no projeto para criar as tabelas. 
Caso ainda não tenha o script, crie manualmente as tabelas conforme o DER fornecido.

4. Gerar o Prisma Client:

npx prisma generate

5. Rodar o projeto:

npm run dev

O servidor será iniciado. Por padrão, estará disponível em http://localhost:3000.

6. Testar as rotas com Insomnia:

Abra o Insomnia e crie requisições usando os métodos HTTP (POST, GET, PUT, PATCH) para os seguintes endpoints:

- /pets
- /atendimentos
- /vacinas
- /colaboradores
- /usuarios

Se houver um arquivo .json com as requisições de exemplo, importe no Insomnia.

ESTRUTURA BÁSICA DO BANCO DE DADOS

- pet
- colaborador
- usuario
- vacina
- atendimento
- pet_vacina

Cada tabela possui campos como ID, DATACAD, ativo, e os devidos relacionamentos com chaves estrangeiras.

OBSERVAÇÕES FINAIS

- O projeto está em desenvolvimento local.
- A estrutura está pronta para futura integração com autenticação, front-end e hospedagem.
- Esta entrega tem foco principal no back-end e banco de dados.
