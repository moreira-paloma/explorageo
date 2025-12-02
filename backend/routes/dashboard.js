const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const taxaAcertos = user.totalPerguntasRespondidas > 0
      ? (user.totalAcertos / user.totalPerguntasRespondidas) * 100
      : 0;

    res.json({
      name: user.name,
      pontuacao: user.pontuacao,
      faseAtual: user.faseAtual,
      conquistas: user.conquistas,
      totalPerguntasRespondidas: user.totalPerguntasRespondidas,
      totalAcertos: user.totalAcertos,
      taxaAcertos: taxaAcertos.toFixed(2),
      tempoMedioResposta: user.tempoMedioResposta,
      ultimoQuizJogado: user.ultimoQuizJogado
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar dashboard.' });
  }
});

module.exports = router;