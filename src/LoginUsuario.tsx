import React, { useState } from 'react';

type Props = {
  onLogin: (userData: {
    name: string;
    userId: string;
    pontuacao: number;
    faseAtual: number;
    conquistas: string[];
    totalPerguntasRespondidas: number;
    totalAcertos: number;
    tempoMedioResposta: number;
    ultimoQuizJogado: string | null;
    taxaAcertos: string; 
  }) => void;
  voltar: () => void;
};

const LoginUsuario = ({ onLogin, voltar }: Props) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    try {
      const resposta = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha })
      });

      const dados = await resposta.json();
      console.log('Dados recebidos do backend:', dados);

      if (!resposta.ok) {
        setErro(dados.error || 'Erro ao fazer login');
        return;
      }

    
      onLogin({
        name: dados.name,
        userId: dados.userId,
        pontuacao: dados.pontuacao,
        faseAtual: dados.faseAtual,
        conquistas: dados.conquistas,
        totalPerguntasRespondidas: dados.totalPerguntasRespondidas,
        totalAcertos: dados.totalAcertos,
        tempoMedioResposta: dados.tempoMedioResposta,
        ultimoQuizJogado: dados.ultimoQuizJogado,
        taxaAcertos: dados.taxaAcertos 
      });
    } catch (err) {
      setErro('Erro de conexão com o servidor');
    }
  };

  return (
    <div className="text-center bg-white text-blue-900 rounded-xl p-6 shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔐 Login</h2>
      <p className="mb-4 text-lg">Entre com seu e-mail e senha:</p>

      <input
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-blue-300 rounded-lg px-4 py-2 mb-3 w-full"
      />
      <input
        type="password"
        placeholder="Sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="border border-blue-300 rounded-lg px-4 py-2 mb-4 w-full"
      />

      {erro && <p className="text-red-600 mb-3">{erro}</p>}

      <div className="flex justify-center gap-4">
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Entrar
        </button>
        <button
          onClick={voltar}
          className="bg-gray-300 text-blue-900 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default LoginUsuario;