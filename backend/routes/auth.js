const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  console.log('📥 Recebido do frontend:', req.body); 

  try {
    const user = new User({ name, email, password });
    await user.save();
    console.log('✅ Usuário salvo com sucesso no MongoDB:', user); 
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    console.error(' Erro ao salvar no MongoDB:', err); 
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

module.exports = router;