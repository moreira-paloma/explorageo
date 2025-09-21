import React, { useState } from 'react';
import CartaoJogo from './CartaoJogo';
import QuizBandeiras from './QuizBandeiras';
import QuizCapitais from './QuizCapitais';
import QuizCultura from './QuizCultura';

function App() {
  const [telaAtual, setTelaAtual] = useState<'inicio' | 'bandeiras' | 'capitais' | 'cultura'>('inicio');

  return (
    <div className="flex flex-col min-h-screen text-white relative overflow-auto">
      <div
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={{
          backgroundImage: "url('/banners.png')",
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          objectFit: 'cover',
        }}
      ></div>

      
      <header className="fixed top-0 left-0 w-full z-20 bg-blue-900/80 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-wide text-white">Explora Geo 🌍</h1>
          <nav className="space-x-6 text-lg font-semibold">
            <button onClick={() => setTelaAtual('inicio')} className="hover:text-blue-300 transition">Início</button>
            <button onClick={() => setTelaAtual('bandeiras')} className="hover:text-blue-300 transition">Bandeiras</button>
            <button onClick={() => setTelaAtual('capitais')} className="hover:text-blue-300 transition">Capitais</button>
            <button onClick={() => setTelaAtual('cultura')} className="hover:text-blue-300 transition">Cultura</button>
          </nav>
        </div>
      </header>
      <div className="h-[80px]"></div>

      {/* content */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12">
        {telaAtual === 'inicio' && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white bg-blue-900/40 backdrop-blur-md px-6 py-3 rounded-xl mb-4 drop-shadow-lg inline-block">
              🌍 Vamos aprender <span className="text-blue-300"> jogando?🌍</span>
            </h2>

            <p className="text-3xl md:text-4xl font-bold text-white bg-blue-800/30 backdrop-blur-md px-6 py-3 rounded-xl mb-6 inline-block drop-shadow-md">
              Bem vindos ao Explora Geo! 🎉
            </p>

            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed drop-shadow-md">
              Aqui tem jogos sobre países, capitais e culturas! 🎮✨
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CartaoJogo
                titulo="🏁 Jogo das Bandeiras"
                descricao="Adivinha de onde é essa bandeira!"
                emoji="🏁"
                cor="blue"
                disponivel={true}
                onClick={() => setTelaAtual('bandeiras')}
              />

              <CartaoJogo
                titulo="🏙️ Quiz de Capitais"
                descricao="Vamos testar as capitais!"
                emoji="🏙️"
                cor="blue"
                disponivel={true}
                onClick={() => setTelaAtual('capitais')}
              />

              <CartaoJogo
                titulo="🎭 Culturas do Mundo"
                descricao="Descubra tradições e curiosidades!"
                emoji="🎭"
                cor="blue"
                disponivel={true}
                onClick={() => setTelaAtual('cultura')}
              />
            </div>
          </div>
        )}

        {telaAtual === 'bandeiras' && (
          <div className="text-center">
            <QuizBandeiras />
            <button
              className="mt-8 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setTelaAtual('inicio')}
            >
              🔙 Voltar pro começo
            </button>
          </div>
        )}

        {telaAtual === 'capitais' && (
          <div className="text-center">
            <QuizCapitais />
            <button
              className="mt-8 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setTelaAtual('inicio')}
            >
              🔙 Voltar pro começo
            </button>
          </div>
        )}

        {telaAtual === 'cultura' && (
          <div className="text-center">
            <QuizCultura />
            <button
              className="mt-8 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setTelaAtual('inicio')}
            >
              🔙 Voltar pro começo
            </button>
          </div>
        )}
      </main>

      <footer className="text-center text-sm text-white bg-blue-900 py-6">
        Feito com React, Tailwind e minha vontade de fazer esse projeto funcionar. 💙🌍<br />
       
      </footer>
    </div>
  );
}

export default App;

