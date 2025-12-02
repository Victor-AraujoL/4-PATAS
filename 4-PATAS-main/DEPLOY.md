# Deploy no Railway

## Configuração necessária

### 1. Variáveis de ambiente
Configure estas variáveis no Railway:

```
DB_HOST=seu-host-railway
DB_USER=root
DB_PASSWORD=sua-senha
DB_NAME=quatro_patas2
DB_PORT=porta-do-banco
```

### 2. Deploy automático
O Railway detecta automaticamente o `package.json` na raiz e executa:
- Build: `npm install` (que roda `cd back_end && npm install`)
- Start: `npm start` (que roda `cd back_end && node index.js`)

### 3. Estrutura
- Backend: `/back_end`
- Frontend: `/front_end` (servido estaticamente pelo backend)
- Banco de dados: MySQL no Railway

### 4. Acessos
- `/` → Redireciona para `/html/login.html`
- `/api/*` → Endpoints da API
- `/api-docs` → Documentação Swagger
- `/html/*` → Páginas do frontend

## Comandos locais

```bash
# Instalar dependências
npm install

# Rodar o projeto
npm start

# Modo desenvolvimento
npm run dev
```

## Troubleshooting

Se o deploy falhar:
1. Verifique os logs no Railway
2. Confirme que as variáveis de ambiente estão configuradas
3. Verifique se o banco de dados está acessível
4. Teste localmente com `npm start`
