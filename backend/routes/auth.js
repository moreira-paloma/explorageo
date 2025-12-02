const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mailjet = require('node-mailjet');

const mailjetClient = mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    try {
      await mailjetClient.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: { Email: 'explorageo@mailjet.com', Name: 'ExploraGeo' },
            To: [{ Email: email, Name: name }],
            Subject: 'Confirmação de cadastro',
            HTMLPart: `<p>Olá <strong>${name}</strong>, seu cadastro no <em>ExploraGeo</em> foi realizado com sucesso! 🌍</p>`
          }
        ]
      });
    } catch (emailErr) {
      console.error("Erro ao enviar email:", emailErr.message);
    }
    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      userId: user._id,
      name: user.name,
      pontuacao: user.pontuacao || 0,
      faseAtual: user.faseAtual || 1,
      conquistas: user.conquistas || [],
      totalPerguntasRespondidas: user.totalPerguntasRespondidas || 0,
      totalAcertos: user.totalAcertos || 0,
      tempoMedioResposta: user.tempoMedioResposta || 0,
      ultimoQuizJogado: user.ultimoQuizJogado || null
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    res.json({
      message: 'Login bem-sucedido',
      userId: user._id,
      name: user.name,
      pontuacao: user.pontuacao || 0,
      faseAtual: user.faseAtual || 1,
      conquistas: user.conquistas || [],
      totalPerguntasRespondidas: user.totalPerguntasRespondidas || 0,
      totalAcertos: user.totalAcertos || 0,
      tempoMedioResposta: user.tempoMedioResposta || 0,
      ultimoQuizJogado: user.ultimoQuizJogado || null
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

router.put('/atualizar', async (req, res) => {
  const { userId, incremento, quiz, acertou, tempoResposta } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    user.totalPerguntasRespondidas = user.totalPerguntasRespondidas || 0;
    user.totalAcertos = user.totalAcertos || 0;
    user.pontuacao = user.pontuacao || 0;
    user.tempoMedioResposta = user.tempoMedioResposta || 0;
    user.conquistas = user.conquistas || [];

    user.totalPerguntasRespondidas += 1;

    if (acertou) {
      user.totalAcertos += 1;
      user.pontuacao += incremento;

      if (user.totalAcertos >= 1 && !user.conquistas.includes("Primeiro acerto")) {
        user.conquistas.push("Primeiro acerto");
      }

      if (user.totalPerguntasRespondidas >= 10 && !user.conquistas.includes("Explorador Iniciante")) {
        user.conquistas.push("Explorador Iniciante");
      }

      if (user.totalAcertos >= 5 && !user.conquistas.includes("Acertador Persistente")) {
        user.conquistas.push("Acertador Persistente");
      }
    }

    if (tempoResposta) {
      const totalRespostas = user.totalPerguntasRespondidas;
      user.tempoMedioResposta =
        ((user.tempoMedioResposta * (totalRespostas - 1)) + tempoResposta) / totalRespostas;
    }

    user.ultimoQuizJogado = quiz || new Date();

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Erro ao atualizar estatísticas:", err.message);
    res.status(500).json({ error: 'Erro ao atualizar estatísticas.' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const taxaAcertos =
      user.totalPerguntasRespondidas > 0
        ? ((user.totalAcertos / user.totalPerguntasRespondidas) * 100).toFixed(2)
        : "0.00";
    res.json({
      name: user.name,
      pontuacao: user.pontuacao || 0,
      faseAtual: user.faseAtual || 1,
      conquistas: user.conquistas || [],
      totalPerguntasRespondidas: user.totalPerguntasRespondidas || 0,
      totalAcertos: user.totalAcertos || 0,
      tempoMedioResposta: user.tempoMedioResposta || 0,
      ultimoQuizJogado: user.ultimoQuizJogado || null,
      taxaAcertos
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar usuário.' });
  }
});

module.exports = router;