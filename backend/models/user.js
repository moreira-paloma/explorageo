const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  pontuacao: { type: Number, default: 0 },
  faseAtual: { type: Number, default: 1 },
  conquistas: { type: [String], default: [] },
  totalPerguntasRespondidas: { type: Number, default: 0 },
  totalAcertos: { type: Number, default: 0 },
  tempoMedioResposta: { type: Number, default: 0 },
  ultimoQuizJogado: { type: String, default: null }
});

module.exports = mongoose.model('User', userSchema);