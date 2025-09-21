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
  { codigoPais: 'BR', alternativas: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador'], respostaCorreta: 'Brasília' },
  { codigoPais: 'JP', alternativas: ['Tóquio', 'Osaka', 'Kyoto', 'Nagoya'], respostaCorreta: 'Tóquio' },
  { codigoPais: 'FR', alternativas: ['Paris', 'Marselha', 'Lyon', 'Nice'], respostaCorreta: 'Paris' },
  { codigoPais: 'DE', alternativas: ['Berlim', 'Frankfurt', 'Hamburgo', 'Munique'], respostaCorreta: 'Berlim' },
  { codigoPais: 'IT', alternativas: ['Roma', 'Milão', 'Veneza', 'Florença'], respostaCorreta: 'Roma' },
  { codigoPais: 'ES', alternativas: ['Madri', 'Barcelona', 'Valência', 'Sevilha'], respostaCorreta: 'Madri' },
  { codigoPais: 'PT', alternativas: ['Lisboa', 'Porto', 'Coimbra', 'Braga'], respostaCorreta: 'Lisboa' },
  { codigoPais: 'GB', alternativas: ['Londres', 'Manchester', 'Liverpool', 'Birmingham'], respostaCorreta: 'Londres' },
  { codigoPais: 'US', alternativas: ['Washington, D.C.', 'Nova York', 'Los Angeles', 'Chicago'], respostaCorreta: 'Washington, D.C.' },
  { codigoPais: 'CA', alternativas: ['Ottawa', 'Toronto', 'Vancouver', 'Montreal'], respostaCorreta: 'Ottawa' },
  { codigoPais: 'AU', alternativas: ['Camberra', 'Sydney', 'Melbourne', 'Brisbane'], respostaCorreta: 'Camberra' },
  { codigoPais: 'MX', alternativas: ['Cidade do México', 'Guadalajara', 'Cancún', 'Monterrey'], respostaCorreta: 'Cidade do México' },
  { codigoPais: 'AR', alternativas: ['Buenos Aires', 'Córdoba', 'Rosário', 'Mendoza'], respostaCorreta: 'Buenos Aires' },
  { codigoPais: 'RU', alternativas: ['Moscou', 'São Petersburgo', 'Kazan', 'Novosibirsk'], respostaCorreta: 'Moscou' },
  { codigoPais: 'CN', alternativas: ['Pequim', 'Xangai', 'Cantão', 'Shenzhen'], respostaCorreta: 'Pequim' },
  { codigoPais: 'IN', alternativas: ['Nova Délhi', 'Mumbai', 'Bangalore', 'Chennai'], respostaCorreta: 'Nova Délhi' },
  { codigoPais: 'KR', alternativas: ['Seul', 'Busan', 'Incheon', 'Daegu'], respostaCorreta: 'Seul' },
  { codigoPais: 'TR', alternativas: ['Ancara', 'Istambul', 'Izmir', 'Antália'], respostaCorreta: 'Ancara' },
  { codigoPais: 'EG', alternativas: ['Cairo', 'Alexandria', 'Luxor', 'Giza'], respostaCorreta: 'Cairo' },
  { codigoPais: 'ZA', alternativas: ['Pretória', 'Joanesburgo', 'Cidade do Cabo', 'Durban'], respostaCorreta: 'Pretória' },
  { codigoPais: 'SE', alternativas: ['Estocolmo', 'Gotemburgo', 'Malmö', 'Uppsala'], respostaCorreta: 'Estocolmo' },
  { codigoPais: 'NO', alternativas: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'], respostaCorreta: 'Oslo' },
  { codigoPais: 'FI', alternativas: ['Helsinque', 'Tampere', 'Turku', 'Oulu'], respostaCorreta: 'Helsinque' },
  { codigoPais: 'PL', alternativas: ['Varsóvia', 'Cracóvia', 'Gdansk', 'Poznan'], respostaCorreta: 'Varsóvia' },
  { codigoPais: 'NL', alternativas: ['Amsterdã', 'Roterdã', 'Haia', 'Utrecht'], respostaCorreta: 'Amsterdã' },
  { codigoPais: 'BE', alternativas: ['Bruxelas', 'Antuérpia', 'Liège', 'Ghent'], respostaCorreta: 'Bruxelas' },
  { codigoPais: 'CH', alternativas: ['Berna', 'Zurique', 'Genebra', 'Lucerna'], respostaCorreta: 'Berna' },
  { codigoPais: 'GR', alternativas: ['Atenas', 'Salônica', 'Patras', 'Heraclião'], respostaCorreta: 'Atenas' },
  { codigoPais: 'DK', alternativas: ['Copenhague', 'Aarhus', 'Odense', 'Aalborg'], respostaCorreta: 'Copenhague' },
  { codigoPais: 'NZ', alternativas: ['Wellington', 'Auckland', 'Christchurch', 'Hamilton'], respostaCorreta: 'Wellington' },
];

const QuizCapitais = () => {
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
          <h2 className="text-2xl font-bold mb-4">Qual é a capital deste país?</h2>
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
          <p className="mt-6 text-lg">Perguntas {indice + 1} de {perguntas.length}</p>
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

export default QuizCapitais;