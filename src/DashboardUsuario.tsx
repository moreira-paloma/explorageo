import React, { useEffect, useState } from 'react';
import axios from 'axios';

type DashboardData = {
  name: string;
  pontuacao: number;
  faseAtual: number;
  conquistas: string[];
  totalPerguntasRespondidas: number;
  totalAcertos: number;
  tempoMedioResposta: number;
  ultimoQuizJogado: string | null;
  taxaAcertos: number;
};

const DashboardUsuario = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    console.log("Dashboard carregando com userId:", userId);
    axios.get(`http://localhost:5000/api/auth/user/${userId}`)
      .then(res => {
        console.log("Resposta backend:", res.data);
        setData(res.data);
      })
      .catch(err => console.error("Erro ao carregar dashboard:", err));
  }, [userId]);

  if (!data) {
    return <p>Carregando dashboard... (userId: {userId})</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl max-w-2xl mx-auto text-blue-900">
      <h2 className="text-3xl font-bold mb-4">📊 Dashboard do Usuário</h2>
      <p className="text-xl mb-2">👤 Nome: {data.name}</p>
      <p className="text-lg mb-2">⭐ Pontuação total: {data.pontuacao}</p>
      <p className="text-lg mb-2">🎯 Nível atual: {data.faseAtual}</p>
      <p className="text-lg mb-2">📈 Taxa de acertos: {data.taxaAcertos}%</p>
      <p className="text-lg mb-2">⏱️ Tempo médio de resposta: {data.tempoMedioResposta}s</p>
      <p className="text-lg mb-2">❓ Perguntas respondidas: {data.totalPerguntasRespondidas}</p>
      <p className="text-lg mb-2">✅ Acertos: {data.totalAcertos}</p>
      <p className="text-lg mb-2">🎮 Último quiz jogado: {data.ultimoQuizJogado ?? "Nenhum"}</p>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">🏆 Conquistas</h3>
        {data.conquistas.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.conquistas.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        ) : (
          <p>Nenhuma conquista desbloqueada ainda.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardUsuario;