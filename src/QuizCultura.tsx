import React, { useState, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';

type Pergunta = {
  codigoPais: string;
  pergunta: string;
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
  { codigoPais: 'JP', pergunta: 'Qual é a arte tradicional japonesa de dobrar papel?', alternativas: ['Origami', 'Ikebana', 'Kintsugi', 'Haiku'], respostaCorreta: 'Origami' },
  { codigoPais: 'BR', pergunta: 'Qual dança é símbolo do carnaval brasileiro?', alternativas: ['Samba', 'Frevo', 'Axé', 'Forró'], respostaCorreta: 'Samba' },
  { codigoPais: 'IN', pergunta: 'Qual festival indiano celebra as cores?', alternativas: ['Holi', 'Diwali', 'Navratri', 'Eid'], respostaCorreta: 'Holi' },
  { codigoPais: 'FR', pergunta: 'Qual alimento é símbolo da França?', alternativas: ['Croissant', 'Pizza', 'Tortilla', 'Sushi'], respostaCorreta: 'Croissant' },
  { codigoPais: 'CN', pergunta: 'O que o dragão simboliza na cultura chinesa?', alternativas: ['Poder', 'Medo', 'Tristeza', 'Solidão'], respostaCorreta: 'Poder' },
  { codigoPais: 'MX', pergunta: 'Qual é o nome da celebração mexicana dos mortos?', alternativas: ['Día de los Muertos', 'Carnaval', 'Semana Santa', 'Cinco de Mayo'], respostaCorreta: 'Día de los Muertos' },
  { codigoPais: 'EG', pergunta: 'Qual estrutura é símbolo do Egito Antigo?', alternativas: ['Pirâmide', 'Templo Maia', 'Coliseu', 'Torre Eiffel'], respostaCorreta: 'Pirâmide' },
  { codigoPais: 'IT', pergunta: 'Qual cidade italiana é famosa por seus canais?', alternativas: ['Veneza', 'Roma', 'Milão', 'Nápoles'], respostaCorreta: 'Veneza' },
  { codigoPais: 'US', pergunta: 'Qual feriado americano celebra a independência?', alternativas: ['4 de Julho', 'Thanksgiving', 'Memorial Day', 'Labor Day'], respostaCorreta: '4 de Julho' },
  { codigoPais: 'DE', pergunta: 'Qual festival alemão celebra a cerveja?', alternativas: ['Oktoberfest', 'Karneval', 'Weihnachten', 'Tag der Einheit'], respostaCorreta: 'Oktoberfest' },
  { codigoPais: 'KR', pergunta: 'Qual prato é tradicional na Coreia do Sul?', alternativas: ['Kimchi', 'Sushi', 'Pho', 'Pad Thai'], respostaCorreta: 'Kimchi' },
  { codigoPais: 'GR', pergunta: 'Qual esporte teve origem na Grécia Antiga?', alternativas: ['Olimpíadas', 'Futebol', 'Basquete', 'Tênis'], respostaCorreta: 'Olimpíadas' },
  { codigoPais: 'RU', pergunta: 'Qual dança é símbolo da Rússia?', alternativas: ['Balé', 'Flamenco', 'Tango', 'Samba'], respostaCorreta: 'Balé' },
  { codigoPais: 'TH', pergunta: 'Qual animal é reverenciado na Tailândia?', alternativas: ['Elefante', 'Leão', 'Cavalo', 'Urso'], respostaCorreta: 'Elefante' },
  { codigoPais: 'ES', pergunta: 'Qual dança é típica da Espanha?', alternativas: ['Flamenco', 'Samba', 'Tango', 'Polca'], respostaCorreta: 'Flamenco' },
  { codigoPais: 'MA', pergunta: 'Qual arte é comum nas construções marroquinas?', alternativas: ['Azulejo', 'Grafite', 'Vidro', 'Madeira'], respostaCorreta: 'Azulejo' },
  { codigoPais: 'ZA', pergunta: 'Qual líder é símbolo da luta contra o apartheid?', alternativas: ['Nelson Mandela', 'Martin Luther King', 'Gandhi', 'Che Guevara'], respostaCorreta: 'Nelson Mandela' },
  { codigoPais: 'AU', pergunta: 'Qual animal é símbolo da Austrália?', alternativas: ['Canguru', 'Urso', 'Leão', 'Pinguim'], respostaCorreta: 'Canguru' },
  { codigoPais: 'FI', pergunta: 'Qual tradição finlandesa envolve sauna?', alternativas: ['Purificação', 'Casamento', 'Festa de aniversário', 'Carnaval'], respostaCorreta: 'Purificação' },
  { codigoPais: 'TR', pergunta: 'Qual doce é típico da Turquia?', alternativas: ['Baklava', 'Churros', 'Brigadeiro', 'Tiramisu'], respostaCorreta: 'Baklava' },
  { codigoPais: 'CA', pergunta: 'Qual esporte é símbolo do Canadá?', alternativas: ['Hóquei no gelo', 'Futebol americano', 'Beisebol', 'Críquete'], respostaCorreta: 'Hóquei no gelo' },
  { codigoPais: 'KE', pergunta: 'Qual atividade é destaque cultural no Quênia?', alternativas: ['Corrida de longa distância', 'Esqui', 'Surf', 'Escalada'], respostaCorreta: 'Corrida de longa distância' },
  { codigoPais: 'ID', pergunta: 'Qual ilha é famosa por sua cultura hindu na Indonésia?', alternativas: ['Bali', 'Java', 'Sumatra', 'Bornéu'], respostaCorreta: 'Bali' },
  { codigoPais: 'VN', pergunta: 'Qual prato é típico do Vietnã?', alternativas: ['Pho', 'Pad Thai', 'Sushi', 'Bibimbap'], respostaCorreta: 'Pho' },
  { codigoPais: 'PE', pergunta: 'Qual civilização construiu Machu Picchu?', alternativas: ['Inca', 'Maia', 'Asteca', 'Olmeca'], respostaCorreta: 'Inca' },
  { codigoPais: 'CL', pergunta: 'Qual deserto está localizado no Chile?', alternativas: ['Atacama', 'Saara', 'Gobi', 'Kalahari'], respostaCorreta: 'Atacama' },
  { codigoPais: 'NZ', pergunta: 'Qual povo indígena é nativo da Nova Zelândia?', alternativas: ['Maori', 'Inuítes', 'Aborígenes', 'Zulus'], respostaCorreta: 'Maori' },
  { codigoPais: 'IE', pergunta: 'Qual festa irlandesa celebra São Patrício?', alternativas: ['St. Patrick’s Day', 'Halloween', 'Easter', 'Guy Fawkes Day'], respostaCorreta: 'St. Patrick’s Day' },
  { codigoPais: 'IL', pergunta: 'Qual prato é típico de Israel?', alternativas: ['Falafel', 'Tacos', 'Pizza', 'Curry'], respostaCorreta: 'Falafel' },
  { codigoPais: 'SA', pergunta: 'Qual cidade é a capital da Arábia Saudita?', alternativas: ['Riyad', 'Jidá', 'Meca', 'Medina'], respostaCorreta: 'Riyad' },
  { codigoPais: 'KR', pergunta: 'Qual é o prato tradicional da Coreia do Sul?', alternativas: ['Kimchi', 'Tempura', 'Pho', 'Ramen'], respostaCorreta: 'Kimchi' },
  { codigoPais: 'EG', pergunta: 'Em qual rio o Egito se localiza?', alternativas: ['Nilo', 'Amazonas', 'Ganges', 'Yangtsé'], respostaCorreta: 'Nilo' },
  { codigoPais: 'BR', pergunta: 'Qual é o maior estado brasileiro em extensão territorial?', alternativas: ['Amazonas', 'Bahia', 'Minas Gerais', 'Pará'], respostaCorreta: 'Amazonas' },
  { codigoPais: 'ZA', pergunta: 'Qual é o maior animal terrestre?', alternativas: ['Elefante', 'Girafa', 'Leão', 'Hipopótamo'], respostaCorreta: 'Elefante' },
  { codigoPais: 'MX', pergunta: 'Qual prato mexicano é feito com milho e feijão?', alternativas: ['Burrito', 'Taco', 'Enchilada', 'Quesadilla'], respostaCorreta: 'Burrito' },
  { codigoPais: 'ES', pergunta: 'Qual cidade é famosa pela Sagrada Família?', alternativas: ['Barcelona', 'Madri', 'Sevilha', 'Valência'], respostaCorreta: 'Barcelona' },
  { codigoPais: 'DE', pergunta: 'Qual cidade é famosa pela Oktoberfest?', alternativas: ['Munique', 'Berlim', 'Hamburgo', 'Frankfurt'], respostaCorreta: 'Munique' },
  { codigoPais: 'IN', pergunta: 'Qual monumento é um símbolo da Índia?', alternativas: ['Taj Mahal', 'Machu Picchu', 'Pirâmides de Gizé', 'Coliseu'], respostaCorreta: 'Taj Mahal' },
  { codigoPais: 'RU', pergunta: 'Qual é o nome do famoso teatro de Moscou?', alternativas: ['Teatro Bolshoi', 'Teatro Nacional', 'La Scala', 'Teatro de São Petersburgo'], respostaCorreta: 'Teatro Bolshoi' },
  { codigoPais: 'FR', pergunta: 'Qual é o famoso museu em Paris?', alternativas: ['Louvre', 'Hermitage', 'Museu do Vaticano', 'Museu Britânico'], respostaCorreta: 'Louvre' },
  { codigoPais: 'JP', pergunta: 'Qual é o nome do famoso monte do Japão?', alternativas: ['Monte Fuji', 'Monte Everest', 'Monte Kilimanjaro', 'Monte Aconcágua'], respostaCorreta: 'Monte Fuji' },
  { codigoPais: 'ZA', pergunta: 'Qual é o maior parque nacional da África do Sul?', alternativas: ['Kruger National Park', 'Masai Mara', 'Serengeti', 'Chobe'], respostaCorreta: 'Kruger National Park' },
  { codigoPais: 'AU', pergunta: 'Qual é a maior cidade da Austrália?', alternativas: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'], respostaCorreta: 'Sydney' },
  { codigoPais: 'BR', pergunta: 'Qual é a maior floresta tropical do mundo?', alternativas: ['Amazônia', 'Congo', 'Sumatra', 'Borneo'], respostaCorreta: 'Amazônia' },
  { codigoPais: 'PE', pergunta: 'Qual civilização construiu as Linhas de Nazca?', alternativas: ['Nazca', 'Maia', 'Inca', 'Asteca'], respostaCorreta: 'Nazca' },
  { codigoPais: 'PH', pergunta: 'Qual é a capital das Filipinas?', alternativas: ['Manila', 'Cebu', 'Davao', 'Quezon City'], respostaCorreta: 'Manila' },
  { codigoPais: 'IT', pergunta: 'Qual é o prato típico da Itália?', alternativas: ['Pizza', 'Sushi', 'Hambúrguer', 'Paella'], respostaCorreta: 'Pizza' },
  { codigoPais: 'US', pergunta: 'Qual cidade é a famosa capital do cinema?', alternativas: ['Los Angeles', 'Nova York', 'Chicago', 'Las Vegas'], respostaCorreta: 'Los Angeles' },
  { codigoPais: 'EG', pergunta: 'Qual é o nome do famoso templo egípcio em Luxor?', alternativas: ['Templo de Karnak', 'Templo de Abu Simbel', 'Templo de Hatshepsut', 'Templo de Filae'], respostaCorreta: 'Templo de Karnak' },
  { codigoPais: 'CN', pergunta: 'Qual é a antiga muralha da China?', alternativas: ['Grande Muralha', 'Muralha de Berlim', 'Muralha do Império Romano', 'Muralha de Adriano'], respostaCorreta: 'Grande Muralha' },
];

type Props = {
  pontos: number;
  onAcerto?: () => void;
  voltar: () => void;
};

const QuizCultura = ({ pontos, onAcerto, voltar }: Props) => {
  const [indice, setIndice] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(10);
  const [alternativasEmbaralhadas, setAlternativasEmbaralhadas] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

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
      setPontuacao(p => p + 1);
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
    <div className="text-center bg-white text-blue-900 rounded-xl p-6 shadow-xl max-w-xl mx-auto">
      {!finalizado ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{perguntaAtual.pergunta}</h2>
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
          <p className="text-xl mb-2">Você acertou {pontuacao} de {perguntas.length} perguntas neste quiz.</p>
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

export default QuizCultura;