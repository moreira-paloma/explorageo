import React, { useState, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import axios from 'axios';

type Pergunta = {
  codigoPais: string;
  alternativas: string[];
  respostaCorreta: string;
};

function embaralhar<T>(array: T[]): T[] {
  return array
    .map(item => ({ item, ordem: Math.random() }))
    .sort((a, b) => a.ordem - b.ordem)
    .map(obj => obj.item);
}

const perguntas: Pergunta[] = [
  { codigoPais: 'BR', alternativas: ['México', 'Argentina', 'Brasil', 'Chile'], respostaCorreta: 'Brasil' },
  { codigoPais: 'JP', alternativas: ['China', 'Coreia do Sul', 'Japão', 'Tailândia'], respostaCorreta: 'Japão' },
  { codigoPais: 'DE', alternativas: ['Bélgica', 'Áustria', 'Suíça', 'Alemanha'], respostaCorreta: 'Alemanha' },
  { codigoPais: 'FR', alternativas: ['França', 'Itália', 'Espanha', 'Portugal'], respostaCorreta: 'França' },
  { codigoPais: 'US', alternativas: ['Canadá', 'Estados Unidos', 'Austrália', 'Reino Unido'], respostaCorreta: 'Estados Unidos' },
  { codigoPais: 'IN', alternativas: ['Nepal', 'Paquistão', 'Índia', 'Bangladesh'], respostaCorreta: 'Índia' },
  { codigoPais: 'IT', alternativas: ['Itália', 'França', 'Grécia', 'Turquia'], respostaCorreta: 'Itália' },
  { codigoPais: 'RU', alternativas: ['Rússia', 'Ucrânia', 'Polônia', 'Cazaquistão'], respostaCorreta: 'Rússia' },
  { codigoPais: 'CN', alternativas: ['China', 'Japão', 'Coreia do Norte', 'Vietnã'], respostaCorreta: 'China' },
  { codigoPais: 'CA', alternativas: ['Canadá', 'Estados Unidos', 'Dinamarca', 'Noruega'], respostaCorreta: 'Canadá' },
  { codigoPais: 'ES', alternativas: ['Espanha', 'Portugal', 'França', 'Itália'], respostaCorreta: 'Espanha' },
  { codigoPais: 'PT', alternativas: ['Angola', 'Espanha', 'Brasil', 'Portugal'], respostaCorreta: 'Portugal' },
  { codigoPais: 'AU', alternativas: ['Austrália', 'Nova Zelândia', 'Reino Unido', 'Canadá'], respostaCorreta: 'Austrália' },
  { codigoPais: 'GB', alternativas: ['Reino Unido', 'Irlanda', 'Escócia', 'País de Gales'], respostaCorreta: 'Reino Unido' },
  { codigoPais: 'MX', alternativas: ['Argentina', 'Brasil', 'México', 'Colômbia'], respostaCorreta: 'México' },
  { codigoPais: 'AR', alternativas: ['Argentina', 'Uruguai', 'Chile', 'Paraguai'], respostaCorreta: 'Argentina' },
  { codigoPais: 'ZA', alternativas: ['Quênia', 'Nigéria', 'África do Sul', 'Egito'], respostaCorreta: 'África do Sul' },
  { codigoPais: 'EG', alternativas: ['Egito', 'Marrocos', 'Tunísia', 'Argélia'], respostaCorreta: 'Egito' },
  { codigoPais: 'KR', alternativas: ['China', 'Japão', 'Coreia do Sul', 'Taiwan'], respostaCorreta: 'Coreia do Sul' },
  { codigoPais: 'TR', alternativas: ['Turquia', 'Grécia', 'Irã', 'Síria'], respostaCorreta: 'Turquia' },
  { codigoPais: 'GR', alternativas: ['Grécia', 'Itália', 'Chipre', 'Albânia'], respostaCorreta: 'Grécia' },
  { codigoPais: 'NL', alternativas: ['Bélgica', 'Holanda', 'Alemanha', 'Dinamarca'], respostaCorreta: 'Holanda' },
  { codigoPais: 'BE', alternativas: ['Bélgica', 'França', 'Luxemburgo', 'Alemanha'], respostaCorreta: 'Bélgica' },
  { codigoPais: 'CH', alternativas: ['Áustria', 'Suíça', 'Alemanha', 'França'], respostaCorreta: 'Suíça' },
  { codigoPais: 'PL', alternativas: ['Polônia', 'Ucrânia', 'Rússia', 'Romênia'], respostaCorreta: 'Polônia' },
  { codigoPais: 'SE', alternativas: ['Suécia', 'Noruega', 'Finlândia', 'Dinamarca'], respostaCorreta: 'Suécia' },
  { codigoPais: 'NO', alternativas: ['Islândia', 'Suécia', 'Dinamarca', 'Noruega'], respostaCorreta: 'Noruega' },
  { codigoPais: 'FI', alternativas: ['Finlândia', 'Estônia', 'Letônia', 'Lituânia'], respostaCorreta: 'Finlândia' },
  { codigoPais: 'NZ', alternativas: ['Austrália', 'Nova Zelândia', 'Fiji', 'Papua Nova Guiné'], respostaCorreta: 'Nova Zelândia' },
  { codigoPais: 'DK', alternativas: ['Noruega', 'Suécia', 'Dinamarca', 'Alemanha'], respostaCorreta: 'Dinamarca' },
];

type Props = {
  pontos: number;
  onAcerto?: () => void;
  voltar: () => void;
  userId: string;
};

const QuizBandeiras = ({ pontos, onAcerto, voltar, userId }: Props) => {
  const [indice, setIndice] = useState(0);
  const [pontuacaoLocal, setPontuacaoLocal] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [tempoRestante, setTempoRestante] = useState(10);
  const [alternativasEmbaralhadas, setAlternativasEmbaralhadas] = useState<string[]>([]);

  const perguntaAtual = perguntas[indice];

  useEffect(() => {
    setAlternativasEmbaralhadas(embaralhar(perguntaAtual.alternativas));
    setTempoRestante(10);
  }, [indice]);

  useEffect(() => {
    if (finalizado) return;
    if (tempoRestante <= 0) {
      setFeedback(`⏱️ Tempo esgotado! A resposta certa era: ${perguntaAtual.respostaCorreta}`);
      setTimeout(() => {
        setFeedback('');
        if (indice + 1 < perguntas.length) {
          setIndice(indice + 1);
        } else {
          setFinalizado(true);
        }
      }, 1500);
      return;
    }
    const timer = setTimeout(() => setTempoRestante(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [tempoRestante, finalizado]);

  const verificarResposta = async (resposta: string) => {
    const acertou = resposta === perguntaAtual.respostaCorreta;
    if (acertou) {
      setPontuacaoLocal(p => p + 1);
      setFeedback('✅ Acertou! 🎉');
      if (onAcerto) onAcerto();
    } else {
      setFeedback(`❌ Errou! A resposta certa era: ${perguntaAtual.respostaCorreta}`);
    }

    try {
      const res = await axios.put('http://localhost:5000/api/auth/atualizar', {
        userId,
        incremento: acertou ? 1 : 0,
        quiz: 'Bandeiras',
        acertou,
        tempoResposta: 10 - tempoRestante
      });
      console.log("Resposta do backend:", res.data);
    } catch (err) {
      console.error("Erro ao atualizar estatísticas:", err);
    }

    setTimeout(() => {
      setFeedback('');
      if (indice + 1 < perguntas.length) {
        setIndice(indice + 1);
      } else {
        setFinalizado(true);
      }
    }, 1500);
  };

  return (
    <div className="text-center bg-white text-blue-900 rounded-xl p-6 shadow-xl">
      {!finalizado ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Qual país tem esta bandeira?</h2>
          <ReactCountryFlag
            countryCode={perguntaAtual.codigoPais}
            svg
            style={{ width: '230px', height: 'auto', marginBottom: '20px' }}
          />
          <div className="text-red-500 font-bold text-lg mb-4">
            ⏳ Tempo restante: {tempoRestante}s
          </div>
                 <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {alternativasEmbaralhadas.map((alt, i) => (
              <button
                key={i}
                onClick={() => verificarResposta(alt)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                {alt}
              </button>
            ))}
          </div>
          {feedback && (
            <div className="mt-4 text-lg font-semibold text-blue-900 bg-blue-100 px-4 py-2 rounded-lg shadow-md">
              {feedback}
            </div>
          )}
          <p className="mt-6 text-lg">
            Pergunta {indice + 1} de {perguntas.length}
          </p>
        </>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">🎉 Quiz Finalizado!</h2>
          <p className="text-xl mb-2">
            Você acertou {pontuacaoLocal} de {perguntas.length} perguntas neste quiz.
          </p>
          <p className="text-lg mb-4">
            Pontuação total acumulada: {pontos}
          </p>
          <button
            onClick={voltar}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            🔙 Voltar ao início
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizBandeiras;