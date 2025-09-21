# 4-PATAS — Guia para Rodar o Front-end

Este guia ensina como abrir e navegar pelas telas do front-end do projeto. O foco aqui é a execução das páginas HTML e dos estilos CSS.

## Estrutura do Front-end

- HTML: `front_end/html`
- CSS: `front_end/css`
- Assets (imagens/ícones): `front_end/assets`

As páginas HTML já referenciam os estilos via caminhos relativos como `../css/...` a partir da pasta `front_end/html`.

## Pré‑requisitos

- Um navegador atual (Chrome, Edge, Firefox ou Safari)
- Opcional (para servir como site):
  - VS Code (extensão Live Server) ou
  - Node.js com `http-server` ou
  - Python 3 (módulo `http.server`)

## Como Executar as Telas

### Opção A — Abrir diretamente no navegador

1. Localize o arquivo de entrada: `front_end/html/index.html`.
2. Dê duplo clique para abrir no navegador.
3. Você também pode abrir diretamente outras telas conforme necessário:
   - `front_end/html/login.html`
   - `front_end/html/pets.html`
   - `front_end/html/colaboradores.html`
   - `front_end/html/pesquisar_vacinas.html`
   - `front_end/html/cadastro_pet.html`
   - `front_end/html/cadastro_usuario.html`
   - `front_end/html/cadastro_atendimento.html`
   - `front_end/html/cadastro_vacina.html`
   - `front_end/html/historico_atendimento.html`
   - `front_end/html/historico_atendimento_admin.html`

Os estilos devem carregar normalmente, pois os caminhos relativos já foram ajustados.

### Opção B — Servir via servidor estático (recomendado)

Isso simula melhor um ambiente real e evita problemas de caminho/segurança do navegador.

- VS Code (Live Server):
  1. Abra a pasta do projeto no VS Code.
  2. Clique com o botão direito em `front_end/html/index.html` e escolha “Open with Live Server”.

- Node `http-server`:
  1. Instale globalmente: `npm i -g http-server`
  2. Rode a partir da pasta raiz do projeto: `http-server front_end -p 8080`
  3. Acesse no navegador: `http://localhost:8080/html/index.html`

- Python 3:
  1. Execute: `python -m http.server 8080 -d front_end`
  2. Acesse no navegador: `http://localhost:8080/html/index.html`

## Integração com o Back-end (opcional)

Algumas telas podem futuramente consumir APIs. Caso necessário:

- Suba o back-end (padrão em `http://localhost:3000`).
- Ajuste eventuais URLs de API nos scripts das páginas.

Resumo para subir o back-end (se precisar):

1. Entre em `back_end` e instale dependências: `npm install`
2. Crie o banco MySQL `quatro_patas2` e aplique o SQL em `banco_dados/banco_4patas.sql`
3. (Se usar Prisma) gere o client: `npx prisma generate`
4. Inicie a API: `npm run dev` (acessa em `http://localhost:3000`)

## Solução de Problemas

- CSS não carrega
  - Garanta que está abrindo a partir de `front_end/html/...` e que o caminho relativo `../css/...` permanece válido.
  - Se estiver servindo via servidor, confirme que a raiz é `front_end`.

- Ícones/Fontes não aparecem
  - Verifique sua conexão com a internet. As páginas usam CDNs (Bootstrap, Font Awesome, Google Fonts).

- 404 ao servir
  - Revise a URL e sirva a pasta `front_end` como raiz. Ex.: `http://localhost:8080/html/index.html`.

---

# Informações do Projeto

Sistema de Gerenciamento — Associação Quatro Patas (Divinolândia de Minas/MG)

## Funcionalidades Principais

- Cadastro, edição e listagem de pets
- Registro e histórico de atendimentos
- Cadastro e controle de vacinas
- Gerenciamento de colaboradores
- Acesso restrito por login de usuários

## Tecnologias Utilizadas

- Node.js + Express (back-end)
- Prisma ORM e MySQL (banco de dados)
- HTML/CSS (front-end)
- Insomnia (testes de API)

## Status

- Projeto em desenvolvimento ativo.
- Front-end estático com estilos próprios e dependências via CDN.
