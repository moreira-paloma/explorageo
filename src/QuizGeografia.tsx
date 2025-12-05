import React, { useState, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';

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
  { codigoPais: 'BR', alternativas: ['América do Sul', 'África', 'Europa', 'Ásia'], respostaCorreta: 'América do Sul' },
  { codigoPais: 'FR', alternativas: ['Europa', 'Ásia', 'América do Norte', 'Oceania'], respostaCorreta: 'Europa' },
  { codigoPais: 'JP', alternativas: ['Ásia', 'Europa', 'América do Sul', 'África'], respostaCorreta: 'Ásia' },
  { codigoPais: 'EG', alternativas: ['África', 'Ásia', 'Europa', 'Oceania'], respostaCorreta: 'África' },
  { codigoPais: 'US', alternativas: ['América do Norte', 'Europa', 'Ásia', 'África'], respostaCorreta: 'América do Norte' },
  { codigoPais: 'CA', alternativas: ['América do Norte', 'América do Sul', 'Europa', 'Ásia'], respostaCorreta: 'América do Norte' },
  { codigoPais: 'AU', alternativas: ['Oceania', 'Ásia', 'Europa', 'África'], respostaCorreta: 'Oceania' },
  { codigoPais: 'IN', alternativas: ['Ásia', 'Europa', 'África', 'América do Sul'], respostaCorreta: 'Ásia' },
  { codigoPais: 'CN', alternativas: ['Ásia', 'Europa', 'África', 'Oceania'], respostaCorreta: 'Ásia' },
  { codigoPais: 'ZA', alternativas: ['África', 'Europa', 'Ásia', 'América do Sul'], respostaCorreta: 'África' },
  { codigoPais: 'AR', alternativas: ['América do Sul', 'América do Norte', 'Europa', 'Ásia'], respostaCorreta: 'América do Sul' },
  { codigoPais: 'MX', alternativas: ['América do Norte', 'América do Sul', 'Europa', 'Ásia'], respostaCorreta: 'América do Norte' },
  { codigoPais: 'RU', alternativas: ['Europa e Ásia', 'África', 'Oceania', 'América do Sul'], respostaCorreta: 'Europa e Ásia' },
  { codigoPais: 'IT', alternativas: ['Europa', 'Ásia', 'América do Norte', 'África'], respostaCorreta: 'Europa' },
  { codigoPais: 'DE', alternativas: ['Europa', 'África', 'Ásia', 'América do Sul'], respostaCorreta: 'Europa' },
  { codigoPais: 'NG', alternativas: ['África', 'Ásia', 'Europa', 'América do Sul'], respostaCorreta: 'África' },
  { codigoPais: 'PK', alternativas: ['Ásia', 'Europa', 'África', 'Oceania'], respostaCorreta: 'Ásia' },
  { codigoPais: 'BD', alternativas: ['Ásia', 'Europa', 'África', 'América do Norte'], respostaCorreta: 'Ásia' },
  { codigoPais: 'TH', alternativas: ['Ásia', 'Europa', 'África', 'Oceania'], respostaCorreta: 'Ásia' },
  { codigoPais: 'VN', alternativas: ['Ásia', 'Europa', 'África', 'América do Sul'], respostaCorreta: 'Ásia' },
  { codigoPais: 'PH', alternativas: ['Ásia', 'Europa', 'África', 'Oceania'], respostaCorreta: 'Ásia' },
  { codigoPais: 'ID', alternativas: ['Ásia', 'Oceania', 'Europa', 'África'], respostaCorreta: 'Ásia' },
  { codigoPais: 'TR', alternativas: ['Europa e Ásia', 'África', 'América do Norte', 'Oceania'], respostaCorreta: 'Europa e Ásia' },
  { codigoPais: 'GR', alternativas: ['Europa', 'Ásia', 'África', 'América do Sul'], respostaCorreta: 'Europa' },
  { codigoPais: 'NL', alternativas: ['Europa', 'África', 'Ásia', 'América do Norte'], respostaCorreta: 'Europa' },
  { codigoPais: 'BE', alternativas: ['Europa', 'África', 'Ásia', 'Oceania'], respostaCorreta: 'Europa' },
  { codigoPais: 'CH', alternativas: ['Europa', 'África', 'Ásia', 'América do Sul'], respostaCorreta: 'Europa' },
  { codigoPais: 'PL', alternativas: ['Europa', 'Ásia', 'África', 'América do Norte'], respostaCorreta: 'Europa' },
  { codigoPais: 'SE', alternativas: ['Europa', 'África', 'Ásia', 'Oceania'], respostaCorreta: 'Europa' },
  { codigoPais: 'NO', alternativas: ['Europa', 'África', 'Ásia', 'América do Sul'], respostaCorreta: 'Europa' },
  { codigoPais: 'FI', alternativas: ['Europa', 'Ásia', 'África', 'América do Norte'], respostaCorreta: 'Europa' },
  { codigoPais: 'DK', alternativas: ['Europa', 'África', 'Ásia', 'Oceania'], respostaCorreta: 'Europa' },
  { codigoPais: 'NZ', alternativas: ['Oceania', 'Ásia', 'Europa', 'América do Sul'], respostaCorreta: 'Oceania' },
  { codigoPais: 'IE', alternativas: ['Europa', 'África', 'Ásia', 'América do Norte'], respostaCorreta: 'Europa' },
  { codigoPais: 'IL', alternativas: ['Ásia', 'Europa', 'África', 'Oceania'], respostaCorreta: 'Ásia' },
  { codigoPais: 'SA', alternativas: ['Ásia', 'África', 'Europa', 'América do Sul'], respostaCorreta: 'Ásia' },
  { codigoPais: 'ET', alternativas: ['África', 'Ásia', 'Europa', 'Oceania'], respostaCorreta: 'África' },
  { codigoPais: 'KE', alternativas: ['África', 'Ásia', 'Europa', 'América do Norte'], respostaCorreta: 'África' },
  { codigoPais: 'TZ', alternativas: ['África', 'Ásia', 'Europa', 'América do Sul'], respostaCorreta: 'África' },
  { codigoPais: 'CZ', alternativas: ['Europa', 'Ásia', 'África', 'Oceania'], respostaCorreta: 'Europa' },
  { codigoPais: 'SG', alternativas: ['Ásia', 'Europa', 'América do Sul', 'Oceania'], respostaCorreta: 'Ásia' },
  { codigoPais: 'MY', alternativas: ['Ásia', 'África', 'América do Norte', 'Europa'], respostaCorreta: 'Ásia' },
  { codigoPais: 'KH', alternativas: ['Ásia', 'África', 'América do Sul', 'Oceania'], respostaCorreta: 'Ásia' },
  { codigoPais: 'MM', alternativas: ['Ásia', 'América do Norte', 'Europa', 'Oceania'], respostaCorreta: 'Ásia' },
  { codigoPais: 'LK', alternativas: ['Ásia', 'América do Sul', 'Oceania', 'África'], respostaCorreta: 'Ásia' },
  { codigoPais: 'BN', alternativas: ['Ásia', 'Europa', 'África', 'Oceania'], respostaCorreta: 'Ásia' },
  { codigoPais: 'KH', alternativas: ['Ásia', 'África', 'Europa', 'América do Norte'], respostaCorreta: 'Ásia' },
  { codigoPais: 'LA', alternativas: ['Ásia', 'África', 'Europa', 'América do Sul'], respostaCorreta: 'Ásia' },
  { codigoPais: 'MN', alternativas: ['Ásia', 'África', 'Europa', 'América do Norte'], respostaCorreta: 'Ásia' },
  { codigoPais: 'NP', alternativas: ['Ásia', 'África', 'América do Sul', 'Oceania'], respostaCorreta: 'Ásia' }

];


type Props = {
  pontos: number;
  onAcerto?: () => void;
};

const QuizGeografia = ({ pontos, onAcerto }: Props) => {
  const [indice, setIndice] = useState(0);
  const [pontuacaoLocal, setPontuacaoLocal] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [tempoRestante, setTempoRestante] = useState(20);
  const [alternativasEmbaralhadas, setAlternativasEmbaralhadas] = useState<string[]>([]);

  const perguntaAtual = perguntas[indice];

  useEffect(() => {
    setAlternativasEmbaralhadas(embaralhar(perguntaAtual.alternativas));
    setTempoRestante(20);
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

    const timer = setTimeout(() => {
      setTempoRestante((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [tempoRestante, finalizado]);

  const verificarResposta = (resposta: string) => {
    if (resposta === perguntaAtual.respostaCorreta) {
      setPontuacaoLocal(p => p + 1);
      setFeedback('✅ Acertou! 🎉');
 if (onAcerto) onAcerto();
    } else {
      setFeedback(`❌ Errou! A resposta certa era: ${perguntaAtual.respostaCorreta}`);
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

  const reiniciarQuiz = () => {
    setIndice(0);
    setPontuacaoLocal(0);
    setFinalizado(false);
    setFeedback('');
    setTempoRestante(10);
  };

  return (
    <div className="text-center bg-white text-blue-900 rounded-xl p-6 shadow-xl max-w-xl mx-auto">
      {!finalizado ? (
        <>
          <h2 className="text-2xl font-bold mb-4">🌍 Onde fica este país?</h2>
          <ReactCountryFlag
            countryCode={perguntaAtual.codigoPais}
            svg
            style={{ width: '230px', height: 'auto', marginBottom: '20px' }}
          />
          <div className="text-red-500 font-bold text-lg mb-4">
            ⏳ Tempo restante: {tempoRestante}s
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {alternativasEmbaralhadas.map((alt) => (
              <button
                key={alt}
                onClick={() => verificarResposta(alt)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg w-full h-14 text-base font-semibold"
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
          <p className="mt-6 text-lg">Pergunta {indice + 1} de {perguntas.length}</p>
        </>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">🎉 Quiz Finalizado!</h2>
          <p className="text-xl mb-2">Você acertou {pontuacaoLocal} de {perguntas.length} perguntas neste quiz.</p>
          <p className="text-lg mb-4">Pontuação total acumulada: {pontos}</p>
          <button
            onClick={reiniciarQuiz}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            🔁 Jogar novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGeografia;
