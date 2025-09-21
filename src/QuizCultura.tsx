import React, { useState } from 'react';
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
];

const QuizCultura = () => {
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
          <h2 className="text-2xl font-bold mb-4">{perguntaAtual.pergunta}</h2>
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

export default QuizCultura;