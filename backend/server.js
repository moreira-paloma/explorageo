const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importa as rotas de autenticação
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Conecta ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar:', err));

// Rota simples para teste
app.get('/', (req, res) => {
  res.send('Backend ok!');
});

// Usa as rotas de cadastro
app.use('/api/auth', authRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));