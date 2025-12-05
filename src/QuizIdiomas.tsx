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
  { codigoPais: 'BR', alternativas: ['Português', 'Espanhol', 'Inglês', 'Francês'], respostaCorreta: 'Português' },
  { codigoPais: 'FR', alternativas: ['Italiano', 'Francês', 'Alemão', 'Espanhol'], respostaCorreta: 'Francês' },
  { codigoPais: 'JP', alternativas: ['Chinês', 'Coreano', 'Japonês', 'Tailandês'], respostaCorreta: 'Japonês' },
  { codigoPais: 'DE', alternativas: ['Alemão', 'Holandês', 'Sueco', 'Inglês'], respostaCorreta: 'Alemão' },
  { codigoPais: 'CN', alternativas: ['Mandarim', 'Japonês', 'Coreano', 'Vietnamita'], respostaCorreta: 'Mandarim' },
  { codigoPais: 'IN', alternativas: ['Hindi', 'Urdu', 'Tâmil', 'Bengali'], respostaCorreta: 'Hindi' },
  { codigoPais: 'RU', alternativas: ['Russo', 'Ucraniano', 'Polonês', 'Tártaro'], respostaCorreta: 'Russo' },
  { codigoPais: 'ES', alternativas: ['Português', 'Italiano', 'Espanhol', 'Catalão'], respostaCorreta: 'Espanhol' },
  { codigoPais: 'PT', alternativas: ['Português', 'Espanhol', 'Francês', 'Inglês'], respostaCorreta: 'Português' },
  { codigoPais: 'US', alternativas: ['Inglês', 'Espanhol', 'Francês', 'Alemão'], respostaCorreta: 'Inglês' },
  { codigoPais: 'CA', alternativas: ['Francês', 'Inglês', 'Espanhol', 'Alemão'], respostaCorreta: 'Inglês' },
  { codigoPais: 'MX', alternativas: ['Espanhol', 'Português', 'Inglês', 'Maya'], respostaCorreta: 'Espanhol' },
  { codigoPais: 'AR', alternativas: ['Espanhol', 'Português', 'Italiano', 'Guarani'], respostaCorreta: 'Espanhol' },
  { codigoPais: 'IT', alternativas: ['Italiano', 'Francês', 'Espanhol', 'Latim'], respostaCorreta: 'Italiano' },
  { codigoPais: 'KR', alternativas: ['Coreano', 'Japonês', 'Chinês', 'Inglês'], respostaCorreta: 'Coreano' },
  { codigoPais: 'EG', alternativas: ['Árabe', 'Hebraico', 'Inglês', 'Francês'], respostaCorreta: 'Árabe' },
  { codigoPais: 'ZA', alternativas: ['Zulu', 'Africâner', 'Inglês', 'Xhosa'], respostaCorreta: 'Zulu' },
  { codigoPais: 'AU', alternativas: ['Inglês', 'Maori', 'Francês', 'Aborígene'], respostaCorreta: 'Inglês' },
  { codigoPais: 'NG', alternativas: ['Inglês', 'Hausa', 'Iorubá', 'Igbo'], respostaCorreta: 'Inglês' },
  { codigoPais: 'PK', alternativas: ['Urdu', 'Hindi', 'Punjabi', 'Inglês'], respostaCorreta: 'Urdu' },
  { codigoPais: 'BD', alternativas: ['Bengali', 'Hindi', 'Urdu', 'Inglês'], respostaCorreta: 'Bengali' },
  { codigoPais: 'IR', alternativas: ['Persa', 'Árabe', 'Curdo', 'Azeri'], respostaCorreta: 'Persa' },
  { codigoPais: 'TH', alternativas: ['Tailandês', 'Vietnamita', 'Laosiano', 'Khmer'], respostaCorreta: 'Tailandês' },
  { codigoPais: 'VN', alternativas: ['Vietnamita', 'Chinês', 'Tailandês', 'Khmer'], respostaCorreta: 'Vietnamita' },
  { codigoPais: 'PH', alternativas: ['Tagalog', 'Inglês', 'Cebuano', 'Espanhol'], respostaCorreta: 'Tagalog' },
  { codigoPais: 'ID', alternativas: ['Indonésio', 'Malaio', 'Javanês', 'Sundanês'], respostaCorreta: 'Indonésio' },
  { codigoPais: 'TR', alternativas: ['Turco', 'Curdo', 'Árabe', 'Persa'], respostaCorreta: 'Turco' },
  { codigoPais: 'GR', alternativas: ['Grego', 'Turco', 'Latim', 'Inglês'], respostaCorreta: 'Grego' },
  { codigoPais: 'NL', alternativas: ['Holandês', 'Alemão', 'Inglês', 'Frísio'], respostaCorreta: 'Holandês' },
  { codigoPais: 'BE', alternativas: ['Francês', 'Holandês', 'Alemão', 'Flemish'], respostaCorreta: 'Francês' },
  { codigoPais: 'CH', alternativas: ['Alemão', 'Francês', 'Italiano', 'Romanche'], respostaCorreta: 'Alemão' },
  { codigoPais: 'PL', alternativas: ['Polonês', 'Russo', 'Ucraniano', 'Tcheco'], respostaCorreta: 'Polonês' },
  { codigoPais: 'SE', alternativas: ['Sueco', 'Finlandês', 'Norueguês', 'Inglês'], respostaCorreta: 'Sueco' },
  { codigoPais: 'NO', alternativas: ['Norueguês', 'Sueco', 'Dinamarquês', 'Inglês'], respostaCorreta: 'Norueguês' },
  { codigoPais: 'FI', alternativas: ['Finlandês', 'Sueco', 'Estoniano', 'Russo'], respostaCorreta: 'Finlandês' },
  { codigoPais: 'DK', alternativas: ['Dinamarquês', 'Norueguês', 'Sueco', 'Alemão'], respostaCorreta: 'Dinamarquês' },
  { codigoPais: 'NZ', alternativas: ['Inglês', 'Maori', 'Samoano', 'Tonganês'], respostaCorreta: 'Inglês' },
  { codigoPais: 'IE', alternativas: ['Irlandês', 'Inglês', 'Gaélico', 'Escocês'], respostaCorreta: 'Irlandês' },
  { codigoPais: 'IL', alternativas: ['Hebraico', 'Árabe', 'Inglês', 'Yiddish'], respostaCorreta: 'Hebraico' },
  { codigoPais: 'SA', alternativas: ['Árabe', 'Inglês', 'Urdu', 'Farsi'], respostaCorreta: 'Árabe' },
  { codigoPais: 'ET', alternativas: ['Amárico', 'Oromo', 'Tigrínia', 'Somali'], respostaCorreta: 'Amárico' },
  { codigoPais: 'KE', alternativas: ['Suaíli', 'Inglês', 'Kikuyu', 'Luo'], respostaCorreta: 'Suaíli' },
  { codigoPais: 'TZ', alternativas: ['Suaíli', 'Inglês', 'Makonde', 'Chaga'], respostaCorreta: 'Suaíli' },
  { codigoPais: 'UA', alternativas: ['Ucraniano', 'Russo', 'Polonês', 'Bielorrusso'], respostaCorreta: 'Ucraniano' },
  { codigoPais: 'CZ', alternativas: ['Tcheco', 'Eslovaco', 'Polonês', 'Alemão'], respostaCorreta: 'Tcheco' },
  { codigoPais: 'HU', alternativas: ['Húngaro', 'Alemão', 'Eslovaco', 'Romeno'], respostaCorreta: 'Húngaro' },
  { codigoPais: 'RO', alternativas: ['Romeno', 'Húngaro', 'Russo', 'Búlgaro'], respostaCorreta: 'Romeno' },
  { codigoPais: 'BG', alternativas: ['Búlgaro', 'Turco', 'Romeno', 'Grego'], respostaCorreta: 'Búlgaro' },
  { codigoPais: 'KR', alternativas: ['Coreano', 'Japonês', 'Chinês', 'Inglês'], respostaCorreta: 'Coreano' },
  { codigoPais: 'NG', alternativas: ['Inglês', 'Hausa', 'Iorubá', 'Igbo'], respostaCorreta: 'Inglês' },
];



type Props = {
  pontos: number;
  onAcerto?: () => void;
  voltar: () => void; 
};

const QuizIdiomas = ({ pontos, onAcerto }: Props) => {
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
          <h2 className="text-2xl font-bold mb-4">Qual idioma é falado neste país?</h2>
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

export default QuizIdiomas;