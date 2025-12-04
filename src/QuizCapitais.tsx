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
  { codigoPais: 'SE', alternativas: ['Estocolmo', 'Gotemburgo', 'Malmö', 'Lund'], respostaCorreta: 'Estocolmo' },
  { codigoPais: 'SK', alternativas: ['Bratislava', 'Košice', 'Nitra', 'Prešov'], respostaCorreta: 'Bratislava' },
  { codigoPais: 'RO', alternativas: ['Bucareste', 'Cluj-Napoca', 'Timișoara', 'Iași'], respostaCorreta: 'Bucareste' },
  { codigoPais: 'HR', alternativas: ['Zagreb', 'Split', 'Dubrovnik', 'Osijek'], respostaCorreta: 'Zagreb' },
  { codigoPais: 'BG', alternativas: ['Sofia', 'Plovdiv', 'Varna', 'Burgas'], respostaCorreta: 'Sofia' },
  { codigoPais: 'AE', alternativas: ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman'], respostaCorreta: 'Abu Dhabi' },
  { codigoPais: 'KE', alternativas: ['Nairobi', 'Mombasa', 'Kisumu', 'Kisii'], respostaCorreta: 'Nairobi' },
  { codigoPais: 'NG', alternativas: ['Abuja', 'Lagos', 'Kano', 'Port Harcourt'], respostaCorreta: 'Abuja' },
  { codigoPais: 'TH', alternativas: ['Bangkok', 'Chiang Mai', 'Pattaya', 'Phuket'], respostaCorreta: 'Bangkok' },
  { codigoPais: 'PH', alternativas: ['Manila', 'Cebu', 'Davao', 'Quezon City'], respostaCorreta: 'Manila' },
  { codigoPais: 'VN', alternativas: ['Hanói', 'Ho Chi Minh', 'Da Nang', 'Hạ Long'], respostaCorreta: 'Hanói' },
  { codigoPais: 'PE', alternativas: ['Lima', 'Cusco', 'Arequipa', 'Trujillo'], respostaCorreta: 'Lima' },
  { codigoPais: 'CO', alternativas: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla'], respostaCorreta: 'Bogotá' },
  { codigoPais: 'CL', alternativas: ['Santiago', 'Valparaíso', 'Concepción', 'Viña del Mar'], respostaCorreta: 'Santiago' },
  { codigoPais: 'EC', alternativas: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato'], respostaCorreta: 'Quito' },
  { codigoPais: 'UY', alternativas: ['Montevidéu', 'Salto', 'Paysandú', 'Maldonado'], respostaCorreta: 'Montevidéu' },
  { codigoPais: 'PE', alternativas: ['Lima', 'Cusco', 'Arequipa', 'Trujillo'], respostaCorreta: 'Lima' },
  { codigoPais: 'IS', alternativas: ['Reiquiavique', 'Akureyri', 'Reykjanesbær', 'Hafnarfjörður'], respostaCorreta: 'Reiquiavique' },
  { codigoPais: 'MT', alternativas: ['Valletta', 'Mosta', 'Sliema', 'Birkirkara'], respostaCorreta: 'Valletta' },
  { codigoPais: 'CY', alternativas: ['Nicósia', 'Limassol', 'Larnaca', 'Paphos'], respostaCorreta: 'Nicósia' },

];


type Props = {
  pontos: number;
  onAcerto?: () => void;
  voltar: () => void;
};

const QuizCapitais = ({ pontos, onAcerto, voltar }: Props) => {
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

  return (
    <div className="text-center bg-white text-blue-900 rounded-xl p-6 shadow-xl">
      {!finalizado ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Qual é a capital deste país?</h2>
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
                  <p className="mt-6 text-lg">Pergunta {indice + 1} de {perguntas.length}</p>
        </>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">🎉 Quiz Finalizado!</h2>
          <p className="text-xl mb-2">Você acertou {pontuacaoLocal} de {perguntas.length} perguntas neste quiz.</p>
          <p className="text-lg mb-4">Pontuação total acumulada: {pontos}</p>
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

export default QuizCapitais;