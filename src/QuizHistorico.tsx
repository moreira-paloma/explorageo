import React, { useState, useEffect } from 'react';

type Pergunta = {
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
  { pergunta: 'Quem descobriu o Brasil?', alternativas: ['Pedro Álvares Cabral', 'Dom Pedro I', 'Tiradentes', 'Cristóvão Colombo'], respostaCorreta: 'Pedro Álvares Cabral' },
  { pergunta: 'Onde aconteceu a Revolução Francesa?', alternativas: ['França', 'Alemanha', 'Inglaterra', 'Espanha'], respostaCorreta: 'França' },
  { pergunta: 'Quem foi o primeiro homem a pisar na Lua?', alternativas: ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'Santos Dumont'], respostaCorreta: 'Neil Armstrong' },
  { pergunta: 'Qual país tem o formato de uma bota?', alternativas: ['Itália', 'França', 'Brasil', 'México'], respostaCorreta: 'Itália' },
  { pergunta: 'Quem inventou a lâmpada elétrica?', alternativas: ['Thomas Edison', 'Albert Einstein', 'Isaac Newton', 'Galileu Galilei'], respostaCorreta: 'Thomas Edison' },
  { pergunta: 'Quem foi o primeiro presidente do Brasil?', alternativas: ['Deodoro da Fonseca', 'Getúlio Vargas', 'Dom Pedro II', 'Juscelino Kubitschek'], respostaCorreta: 'Deodoro da Fonseca' },
  { pergunta: 'Qual cidade foi destruída pelo vulcão Vesúvio?', alternativas: ['Pompéia', 'Roma', 'Atenas', 'Lisboa'], respostaCorreta: 'Pompéia' },
  { pergunta: 'Quem foi o líder da independência da Índia?', alternativas: ['Mahatma Gandhi', 'Nelson Mandela', 'Martin Luther King', 'Dalai Lama'], respostaCorreta: 'Mahatma Gandhi' },
  { pergunta: 'Quem foi o faraó mais famoso do Egito?', alternativas: ['Tutancâmon', 'Cleópatra', 'Ramsés', 'Akhenaton'], respostaCorreta: 'Tutancâmon' },
  { pergunta: 'Quem pintou a Mona Lisa?', alternativas: ['Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo', 'Van Gogh'], respostaCorreta: 'Leonardo da Vinci' },
  { pergunta: 'Quem foi o primeiro homem no espaço?', alternativas: ['Yuri Gagarin', 'Neil Armstrong', 'Buzz Aldrin', 'Alan Shepard'], respostaCorreta: 'Yuri Gagarin' },
  { pergunta: 'Qual foi o navio que afundou em 1912?', alternativas: ['Titanic', 'Santa Maria', 'Mayflower', 'Endeavour'], respostaCorreta: 'Titanic' },
  { pergunta: 'Quem foi o cientista que descobriu a gravidade?', alternativas: ['Isaac Newton', 'Galileu Galilei', 'Einstein', 'Pasteur'], respostaCorreta: 'Isaac Newton' },
  { pergunta: 'Quem escreveu “Dom Quixote”?', alternativas: ['Miguel de Cervantes', 'William Shakespeare', 'Machado de Assis', 'Monteiro Lobato'], respostaCorreta: 'Miguel de Cervantes' },
  { pergunta: 'Quem foi o primeiro imperador do Brasil?', alternativas: ['Dom Pedro I', 'Dom Pedro II', 'Dom João VI', 'Tiradentes'], respostaCorreta: 'Dom Pedro I' },
  { pergunta: 'Qual invenção revolucionou a leitura?', alternativas: ['Imprensa', 'Telefone', 'Rádio', 'Televisão'], respostaCorreta: 'Imprensa' },
  { pergunta: 'Quem foi o líder da luta contra o racismo nos EUA?', alternativas: ['Martin Luther King', 'Barack Obama', 'Malcolm X', 'Mandela'], respostaCorreta: 'Martin Luther King' },
  { pergunta: 'Qual país construiu a Muralha da China?', alternativas: ['China', 'Japão', 'Índia', 'Coreia'], respostaCorreta: 'China' },
  { pergunta: 'Quem foi o navegador que deu a volta ao mundo?', alternativas: ['Fernão de Magalhães', 'Cristóvão Colombo', 'Vasco da Gama', 'Américo Vespúcio'], respostaCorreta: 'Fernão de Magalhães' },
  { pergunta: 'Qual era o nome do avião de Santos Dumont?', alternativas: ['14 Bis', 'Demoiselle', 'Concorde', 'Zeppelin'], respostaCorreta: '14 Bis' },
  { pergunta: 'Quem foi o famoso líder sul-africano contra o apartheid?', alternativas: ['Nelson Mandela', 'Obama', 'Gandhi', 'Luther King'], respostaCorreta: 'Nelson Mandela' },
  { pergunta: 'Qual era o nome do navio de Cristóvão Colombo?', alternativas: ['Santa Maria', 'Titanic', 'Mayflower', 'Endurance'], respostaCorreta: 'Santa Maria' },
  { pergunta: 'Quem foi o cientista que criou a teoria da relatividade?', alternativas: ['Albert Einstein', 'Isaac Newton', 'Galileu', 'Darwin'], respostaCorreta: 'Albert Einstein' },
  { pergunta: 'Qual foi o primeiro país a usar aviões em guerra?', alternativas: ['Itália', 'Alemanha', 'França', 'Inglaterra'], respostaCorreta: 'Itália' },
  { pergunta: 'Quem foi o primeiro papa?', alternativas: ['Pedro', 'João Paulo II', 'Francisco', 'Bento XVI'], respostaCorreta: 'Pedro' },
  { pergunta: 'Qual civilização construiu as pirâmides?', alternativas: ['Egípcia', 'Grega', 'Romana', 'Inca'], respostaCorreta: 'Egípcia' },
  { pergunta: 'Quem foi o herói da Inconfidência Mineira?', alternativas: ['Tiradentes', 'Dom Pedro I', 'José Bonifácio', 'Zumbi'], respostaCorreta: 'Tiradentes' },
  { pergunta: 'Qual país usou samurais na história?', alternativas: ['Japão', 'China', 'Coreia', 'Índia'], respostaCorreta: 'Japão' },
  { pergunta: 'Quem foi o primeiro presidente dos EUA?', alternativas: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson', 'Roosevelt'], respostaCorreta: 'George Washington' },
  { pergunta: 'Qual cidade foi capital do Império Romano?', alternativas: ['Roma', 'Atenas', 'Paris', 'Londres'], respostaCorreta: 'Roma' },
  { pergunta: 'Quem foi o líder da Revolução Cubana?', alternativas: ['Fidel Castro', 'Che Guevara', 'Hugo Chávez', 'Simón Bolívar'], respostaCorreta: 'Fidel Castro' },
  { pergunta: 'Qual país colonizou o Brasil?', alternativas: ['Portugal', 'Espanha', 'França', 'Inglaterra'], respostaCorreta: 'Portugal' },
  { pergunta: 'Quem foi o criador da teoria da evolução?', alternativas: ['Charles Darwin', 'Einstein', 'Newton', 'Pasteur'], respostaCorreta: 'Charles Darwin' },
  { pergunta: 'Qual era o nome do império dos czares?', alternativas: ['Império Russo', 'Império Otomano', 'Império Romano', 'Império Chinês'], respostaCorreta: 'Império Russo' },
  { pergunta: 'Quem foi o primeiro homem a voar em um avião?', alternativas: ['Santos Dumont', 'Irmãos Wright', 'Lindbergh', 'Amelia Earhart'], respostaCorreta: 'Santos Dumont' },
  { pergunta: 'Qual país construiu o Coliseu?', alternativas: ['Itália', 'Grécia', 'Egito', 'França'], respostaCorreta: 'Itália' },
  { pergunta: 'Quem foi o imperador francês famoso por suas batalhas?', alternativas: ['Napoleão Bonaparte', 'Luís XIV', 'Carlos Magno', 'Henrique VIII'], respostaCorreta: 'Napoleão Bonaparte' },
  { pergunta: 'Qual civilização criou os Jogos Olímpicos?', alternativas: ['Gregos', 'Romanos', 'Egípcios', 'Maias'], respostaCorreta: 'Gregos' },
  { pergunta: 'Quem foi o navegador português que chegou à Índia?', alternativas: ['Vasco da Gama', 'Pedro Álvares Cabral', 'Magalhães', 'Colombo'], respostaCorreta: 'Vasco da Gama' },
  { pergunta: 'Qual país foi dividido em Ocidental e Oriental após a Segunda Guerra?', alternativas: ['Alemanha', 'França', 'Itália', 'Polônia'], respostaCorreta: 'Alemanha' },
];

type Props = {
  pontos: number;
  onAcerto?: () => void;
};

const QuizHistorico = ({ pontos, onAcerto }: Props) => {
  const [indice, setIndice] = useState(0);
  const [pontuacaoLocal, setPontuacaoLocal] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [tempoRestante, setTempoRestante] = useState(10);
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
          <h2 className="text-2xl font-bold mb-4">📚 Fatos Históricos</h2>
          <p className="text-lg mb-6">{perguntaAtual.pergunta}</p>
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

export default QuizHistorico;