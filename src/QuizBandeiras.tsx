import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';

type Pergunta = {
  codigoPais: string;
  alternativas: string[];
  respostaCorreta: string;
};

//indice aleatorio
function embaralhar<T>(array: T[]): T[] {
  return array
    .map(item => ({ item, ordem: Math.random() }))
    .sort((a, b) => a.ordem - b.ordem)
    .map(obj => obj.item);
}

const perguntas: Pergunta[] = [
  { codigoPais: 'BR', alternativas: ['Mexico', 'Argentina', 'Brasil', 'Chile'], respostaCorreta: 'Brasil' },
  { codigoPais: 'JP', alternativas: ['China', 'Coreia do Sul', 'Japão', 'Tailândia'], respostaCorreta: 'Japão' },
  { codigoPais: 'DE', alternativas: ['Belgica', 'Áustria', 'Suíça', 'Alemanha'], respostaCorreta: 'Alemanha' },
  { codigoPais: 'FR', alternativas: ['França', 'Itália', 'Espanha', 'Portugal'], respostaCorreta: 'França' },
  { codigoPais: 'US', alternativas: ['Canadá', 'Estados Unidos', 'Australia', 'Reino Unido'], respostaCorreta: 'Estados Unidos' },
  { codigoPais: 'IN', alternativas: ['Nepal', 'Paquistão', 'India', 'Bangladesh'], respostaCorreta: 'Índia' },
  { codigoPais: 'IT', alternativas: ['Italia', 'França', 'Grécia', 'Turquia'], respostaCorreta: 'Itália' },
  { codigoPais: 'RU', alternativas: ['Rússia', 'Ucrânia', 'Polônia', 'Cazaquistão'], respostaCorreta: 'Rússia' },
  { codigoPais: 'CN', alternativas: ['China', 'Japão', 'Coreia do Norte', 'Vietnã'], respostaCorreta: 'China' },
  { codigoPais: 'CA', alternativas: ['Canadá', 'Estados Unidos', 'Dinamarca', 'Noruega'], respostaCorreta: 'Canadá' },
  { codigoPais: 'ES', alternativas: ['Espanha', 'Portugal', 'França', 'Itália'], respostaCorreta: 'Espanha' },
  { codigoPais: 'PT', alternativas: ['Angola', 'Espanha', 'Brasil', 'Portugal'], respostaCorreta: 'Portugal' },
  { codigoPais: 'AU', alternativas: ['Austrália', 'Nova Zelândia', 'Reino Unido', 'Canadá'], respostaCorreta: 'Austrália' },
  { codigoPais: 'GB', alternativas: ['Reino Unido', 'Irlanda', 'Escócia', 'País de Gales'], respostaCorreta: 'Reino Unido' },
  { codigoPais: 'MX', alternativas: ['Argentina', 'Brasil', 'Mexico', 'Colombia'], respostaCorreta: 'México' },
  { codigoPais: 'AR', alternativas: ['Argentina', 'Uruguai', 'Chile', 'Paraguai'], respostaCorreta: 'Argentina' },
  { codigoPais: 'ZA', alternativas: ['Quenia', 'Nigéria', 'Africa do Sul', 'Egito'], respostaCorreta: 'África do Sul' },
  { codigoPais: 'EG', alternativas: ['Egito', 'Marrocos', 'Tunísia', 'Argélia'], respostaCorreta: 'Egito' },
  { codigoPais: 'KR', alternativas: ['China', 'Japão', 'Correia do Sul', 'Taiwan'], respostaCorreta: 'Coreia do Sul' },
  { codigoPais: 'TR', alternativas: ['Turquia', 'Grécia', 'Irã', 'Síria'], respostaCorreta: 'Turquia' },
  { codigoPais: 'GR', alternativas: ['Grécia', 'Itália', 'Chipre', 'Albânia'], respostaCorreta: 'Grécia' },
  { codigoPais: 'NL', alternativas: ['Holanda', 'Bélgica', 'Alemanha', 'Dinamarca'], respostaCorreta: 'Holanda' },
  { codigoPais: 'BE', alternativas: ['Bélgica', 'França', 'Luxemburgo', 'Alemanha'], respostaCorreta: 'Bélgica' },
  { codigoPais: 'CH', alternativas: ['Austria', 'Suica', 'Alemanha', 'França'], respostaCorreta: 'Suíça' },
  { codigoPais: 'PL', alternativas: ['Polônia', 'Ucrânia', 'Rússia', 'Romênia'], respostaCorreta: 'Polônia' },
  { codigoPais: 'SE', alternativas: ['Suécia', 'Noruega', 'Finlândia', 'Dinamarca'], respostaCorreta: 'Suécia' },
  { codigoPais: 'NO', alternativas: ['Islandia', 'Suécia', 'Dinamarca', 'Noruega'], respostaCorreta: 'Noruega' },
  { codigoPais: 'FI', alternativas: ['Finlândia', 'Estônia', 'Letônia', 'Lituânia'], respostaCorreta: 'Finlândia' },
  { codigoPais: 'NZ', alternativas: ['Australia', 'Nova Zelandia', 'Fiji', 'Papua Nova Guiné'], respostaCorreta: 'Nova Zelândia' },
  { codigoPais: 'DK', alternativas: ['Noruega', 'Suécia', 'Dinamarca', 'Alemanha'], respostaCorreta: 'Dinamarca' },
];

const QuizBandeiras = () => {
  const [indice, setIndice] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const perguntaAtual = perguntas[indice];

  const verificarResposta = (resposta: string) => {
    if (resposta === perguntaAtual.respostaCorreta) {
      setPontuacao(pontuacao + 1);
    }

    if (indice + 1 < perguntas.length) {
      setIndice(indice + 1);
    } else {
      setFinalizado(true);
    }
  };

  return (
    <div className="text-center text-white">
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