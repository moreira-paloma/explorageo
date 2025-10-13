import React, { useState } from 'react';
import CartaoJogo from './CartaoJogo';
import QuizBandeiras from './QuizBandeiras';
import QuizCapitais from './QuizCapitais';
import QuizCultura from './QuizCultura';
import CadastroUsuario from './CadastroUsuario';

function App() {
  const [telaAtual, setTelaAtual] = useState('inicio');

  const [particulas, setParticulas] = useState<
    { id: number; x: number; y: number; emoji: string }[]
  >([]);

  const mostrarParticulas = () => {
    const novas = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: ['🎉', '⭐', '✨'][Math.floor(Math.random() * 3)],
    }));
    setParticulas(novas);
    setTimeout(() => setParticulas([]), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen text-white relative overflow-auto">
     
      {particulas.map((p) => (
        <div
          key={p.id}
            className="absolute text-9xl animate-ping z-50 pointer-events-none"
           style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: '4s',
          }}
        >
          {p.emoji}
        </div>
      ))}

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
            <button onClick={() => setTelaAtual('cadastro')} className="hover:text-blue-300 transition">Cadastro</button>
          </nav>
        </div>
      </header>
      <div className="h-[80px]"></div>

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
            <QuizBandeiras onAcerto={mostrarParticulas} />
            <button className="mt-8 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={() => setTelaAtual('inicio')}>
              🔙 Voltar pro começo
            </button>
          </div>
        )}

        {telaAtual === 'capitais' && (
          <div className="text-center">
            <QuizCapitais onAcerto={mostrarParticulas} />
            <button className="mt-8 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={() => setTelaAtual('inicio')}>
              🔙 Voltar pro começo
            </button>
          </div>
        )}

        {telaAtual === 'cultura' && (
          <div className="text-center">
            <QuizCultura onAcerto={mostrarParticulas} />
            <button className="mt-8 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={() => setTelaAtual('inicio')}>
              🔙 Voltar pro começo
            </button>
          </div>
        )}

        {telaAtual === 'cadastro' && (
          <div className="text-center">
            <CadastroUsuario />
            <button className="mt-8 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={() => setTelaAtual('inicio')}>
              🔙 Voltar pro começo
            </button>
          </div>
        )}
      </main>

      <footer className="text-center text-sm text-white bg-blue-900 py-6">
        Feito com React, Tailwind e minha vontade de fazer esse projeto funcionar. 💙🌍
      </footer>
    </div>
  );
}

export default App;