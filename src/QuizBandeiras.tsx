import React, { useState } from 'react';
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
  { codigoPais: 'BR', alternativas: ['Mexico', 'Argentina', 'Brasil', 'Chile'], respostaCorreta: 'Brasil' },
  { codigoPais: 'JP', alternativas: ['China', 'Coreia do Sul', 'Japão', 'Tailândia'], respostaCorreta: 'Japão' },
  { codigoPais: 'DE', alternativas: ['Belgica', 'Austria', 'Suíça', 'Alemanha'], respostaCorreta: 'Alemanha' },
  { codigoPais: 'FR', alternativas: ['França', 'Italia', 'Espanha', 'Portugal'], respostaCorreta: 'França' },
  { codigoPais: 'US', alternativas: ['Canadá', 'Estados Unidos', 'Australia', 'Reino Unido'], respostaCorreta: 'Estados Unidos' },
  { codigoPais: 'IN', alternativas: ['Nepal', 'Paquistão', 'India', 'Bangladesh'], respostaCorreta: 'Índia' },
  { codigoPais: 'IT', alternativas: ['Italia', 'França', 'Grecia', 'Turquia'], respostaCorreta: 'Italia' },
  { codigoPais: 'RU', alternativas: ['Rússia', 'Ucrânia', 'Polônia', 'Cazaquistão'], respostaCorreta: 'Russia' },
  { codigoPais: 'CN', alternativas: ['China', 'Japão', 'Coreia do Norte', 'Vietnã'], respostaCorreta: 'China' },
  { codigoPais: 'CA', alternativas: ['Canadá', 'Estados Unidos', 'Dinamarca', 'Noruega'], respostaCorreta: 'Canadá' },
  { codigoPais: 'ES', alternativas: ['Espanha', 'Portugal', 'França', 'Itália'], respostaCorreta: 'Espanha' },
  { codigoPais: 'PT', alternativas: ['Angola', 'Espanha', 'Brasil', 'Portugal'], respostaCorreta: 'Portugal' },
  { codigoPais: 'AU', alternativas: ['Austrália', 'Nova Zelândia', 'Reino Unido', 'Canadá'], respostaCorreta: 'Austrália' },
  { codigoPais: 'GB', alternativas: ['Reino Unido', 'Irlanda', 'Escócia', 'País de Gales'], respostaCorreta: 'Reino Unido' },
  { codigoPais: 'MX', alternativas: ['Argentina', 'Brasil', 'Mexico', 'Colombia'], respostaCorreta: 'Mexico' },
  { codigoPais: 'AR', alternativas: ['Argentina', 'Uruguai', 'Chile', 'Paraguai'], respostaCorreta: 'Argentina' },
  { codigoPais: 'ZA', alternativas: ['Quenia', 'Nigéria', 'Africa do Sul', 'Egito'], respostaCorreta: 'África do Sul' },
  { codigoPais: 'EG', alternativas: ['Egito', 'Marrocos', 'Tunísia', 'Argélia'], respostaCorreta: 'Egito' },
  { codigoPais: 'KR', alternativas: ['China', 'Japão', 'Correia do Sul', 'Taiwan'], respostaCorreta: 'Coreia do Sul' },
  { codigoPais: 'TR', alternativas: ['Turquia', 'Grecia', 'Irã', 'Síria'], respostaCorreta: 'Turquia' },
  { codigoPais: 'GR', alternativas: ['Grecia', 'Italia', 'Chipre', 'Albânia'], respostaCorreta: 'Grecia' },
  { codigoPais: 'NL', alternativas: ['Belgica', 'Holanda', 'Alemanha', 'Dinamarca'], respostaCorreta: 'Holanda' },
  { codigoPais: 'BE', alternativas: ['Bélgica', 'França', 'Luxemburgo', 'Alemanha'], respostaCorreta: 'Belgica' },
  { codigoPais: 'CH', alternativas: ['Austria', 'Suíça', 'Alemanha', 'França'], respostaCorreta: 'Suíça' },
  { codigoPais: 'PL', alternativas: ['Polonia', 'Ucrânia', 'Russia', 'Romênia'], respostaCorreta: 'Polonia' },
  { codigoPais: 'SE', alternativas: ['Suécia', 'Noruega', 'Finlândia', 'Dinamarca'], respostaCorreta: 'Suecia' },
  { codigoPais: 'NO', alternativas: ['Islandia', 'Suecia', 'Dinamarca', 'Noruega'], respostaCorreta: 'Noruega' },
  { codigoPais: 'FI', alternativas: ['Finlandia', 'Estônia', 'Letônia', 'Lituânia'], respostaCorreta: 'Finlândia' },
  { codigoPais: 'NZ', alternativas: ['Australia', 'Nova Zelandia', 'Fiji', 'Papua Nova Guiné'], respostaCorreta: 'Nova Zelandia' },
  { codigoPais: 'DK', alternativas: ['Noruega', 'Suecia', 'Dinamarca', 'Alemanha'], respostaCorreta: 'Dinamarca' },
];

type Props = {
  onAcerto?: () => void;
};

const QuizBandeiras = ({ onAcerto }: Props) => {
  const [indice, setIndice] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const perguntaAtual = perguntas[indice];

  const verificarResposta = (resposta: string) => {
    if (resposta === perguntaAtual.respostaCorreta) {
      setPontuacao(pontuacao + 1);
      if (onAcerto) onAcerto(); // 🎉 dispara partículas!
    }

    if (indice + 1 < perguntas.length) {
      setIndice(indice + 1);
    } else {
      setFinalizado(true);
    }
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
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {embaralhar(perguntaAtual.alternativas).map((alt, i) => (
              <button
                key={i}
                onClick={() => verificarResposta(alt)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                {alt}
              </button>
            ))}
          </div>
          <p className="mt-6 text-lg">Pergunta {indice + 1} de {perguntas.length}</p>
        </>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">🎉 Quiz Finalizado!</h2>
          <p className="text-xl">Você acertou {pontuacao} de {perguntas.length} perguntas.</p>
        </div>
      )}
    </div>
  );
};

export default QuizBandeiras;