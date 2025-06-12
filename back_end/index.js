const express = require('express');
const dotenv = require('dotenv');
const PetRoutes = require('./src/Routes/petRoutes');
const ColaboradorRoutes = require('./src/Routes/colaboradorRoutes');
const VacinaRoutes = require('./src/Routes/vacinaRoutes');
const UsuarioRoutes = require('./src/Routes/usuarioRoutes');

const db = require('./src/config/db'); 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/pets', PetRoutes); 
app.use('/api/colaboradores', ColaboradorRoutes);
app.use('/api/vacinas', VacinaRoutes);
app.use('/api/usuarios', UsuarioRoutes);

db.sync()
  .then(() => console.log('Banco de dados sincronizado com sucesso!'))
  .catch((err) => console.error('Erro ao sincronizar o banco de dados:', err));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;