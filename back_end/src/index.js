const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const colaboradorRoutes = require('./routes/ColaboradorRoutes');


app.use(cors());
app.use(express.json());

app.use('/api/colaboradores', colaboradorRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
