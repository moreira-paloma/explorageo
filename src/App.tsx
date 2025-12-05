import React, { useState, useEffect } from 'react';
import CartaoJogo from './CartaoJogo';
import QuizBandeiras from './QuizBandeiras';
import QuizCapitais from './QuizCapitais';
import QuizCultura from './QuizCultura';
import QuizIdiomas from './QuizIdiomas';
import QuizGeografia from './QuizGeografia';
import QuizHistorico from './QuizHistorico';
import CadastroUsuario from './CadastroUsuario';
import LoginUsuario from './LoginUsuario';
import { calcularNivel, niveis } from './Niveis';
import FundoFuturista from './FundoFuturista';
import DashboardUsuario from './DashboardUsuario';

function App() {
  const [telaAtual, setTelaAtual] = useState('inicio');
  const [pontos, setPontos] = useState(0);

  
  const [usuarioLogado, setUsuarioLogado] = useState<null | {
    name: string;
    userId: string;
    pontuacao: number;
    faseAtual: number;
    conquistas: string[];
    totalPerguntasRespondidas: number;
    totalAcertos: number;
    tempoMedioResposta: number;
    ultimoQuizJogado: string | null;
  }>(null);

  const nivel = calcularNivel(pontos);

  const [particulas, setParticulas] = useState<
    { id: number; x: number; y: number; emoji: string }[]
  >([]);

  useEffect(() => {
    const salvo = localStorage.getItem('usuario');
    if (salvo) {
      try {
        const userData = JSON.parse(salvo);
        setUsuarioLogado(userData);
      } catch (e) {
        console.error('Erro ao restaurar usuário:', e);
      }
    }
  }, []);

  const handleLogin = (userData: {
    name: string;
    userId: string;
    pontuacao: number;
    faseAtual: number;
    conquistas: string[];
    totalPerguntasRespondidas: number;
    totalAcertos: number;
    tempoMedioResposta: number;
    ultimoQuizJogado: string | null;
  }) => {
    setUsuarioLogado(userData);
    localStorage.setItem('usuario', JSON.stringify(userData));
    setTelaAtual('inicio');
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    localStorage.removeItem('usuario');
    setTelaAtual('inicio');
  };

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

  const progressoNivel = (() => {
    const atualIndex = niveis.findIndex((n) => n.nome === nivel.nome);
    const atualMin = nivel.minimo;
    const proximoMin = niveis[atualIndex + 1]?.minimo ?? atualMin + 15;
    const progresso = ((pontos - atualMin) / (proximoMin - atualMin)) * 100;
    return Math.min(100, Math.max(0, progresso));
  })();

  return (
    <div className="flex flex-col min-h-screen text-white font-sans relative overflow-auto">
      <FundoFuturista />

      {particulas.map((p) => (
        <div
          key={p.id}
          className="absolute text-6xl animate-ping z-50 pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: '4s',
          }}
        >
          {p.emoji}
        </div>
      ))}

      <header className="fixed top-0 left-0 w-full z-50 bg-blue-900/80 backdrop-blur-md shadow-md border-b border-blue-700/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide text-white">Explora Geo 🌍</h1>
          <nav className="flex gap-2 overflow-x-auto whitespace-nowrap text-xs font-medium text-yellow-300">
            {[
              { tela: 'inicio', label: '🏠 Início' },
              { tela: 'bandeiras', label: '🏁 Bandeiras' },
              { tela: 'capitais', label: '🏙️ Capitais' },
              { tela: 'cultura', label: '🎭 Cultura' },
              { tela: 'idiomas', label: '🗣️ Idiomas' },
              { tela: 'geografia', label: '🧭 Geografia' },
              { tela: 'historico', label: '📚 História' },
              { tela: 'cadastro', label: '📝 Cadastro' },
            ].map(({ tela, label }) => (
              <button
                key={tela}
                onClick={() => setTelaAtual(tela)}
                className={`px-2 py-1 rounded-full transition ${
                  telaAtual === tela
                    ? 'bg-yellow-400 text-blue-900 font-bold'
                    : 'bg-yellow-400/20 hover:bg-yellow-400/40 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
            {usuarioLogado ? (
              <>
                <button
                  onClick={() => setTelaAtual('dashboard')}
                  className={`px-2 py-1 rounded-full transition ${
                    telaAtual === 'dashboard'
                      ? 'bg-yellow-400 text-blue-900 font-bold'
                      : 'bg-yellow-400/20 hover:bg-yellow-400/40 hover:text-white'
                  }`}
                >
                  📊 Dashboard
                </button>
                <span className="text-white font-semibold">👋 {usuarioLogado.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-2 py-1 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/40 hover:text-white"
                >
                  🚪 Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => setTelaAtual('login')}
                className="px-2 py-1 rounded-full bg-green-500/20 text-green-300 hover:bg-green-500/40 hover:text-white"
              >
                🔐 Login
              </button>
            )}
          </nav>
        </div>
      </header>
      <div className="h-[80px]"></div>

      {telaAtual === 'inicio' && (
        <div className="absolute top-24 right-6 bg-blue-900/40 text-white p-4 rounded-xl border border-white/20 shadow-md backdrop-blur-md w-64 z-20">
          <h3 className="text-sm font-bold mb-2">🧑‍🎓 Nível: {nivel.nome}</h3>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-400 h-full"
              style={{ width: `${progressoNivel}%` }}
            ></div>
          </div>
          <p className="text-xs text-right text-cyan-200 mt-1">
            {Math.round(progressoNivel)}%
          </p>
        </div>
      )}

      <main className="flex-grow max-w-6xl mx-auto px-6 py-12">
        {telaAtual === 'inicio' && (
          <div className="text-center mb-12 relative z-14">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-white bg-white-800 px-4 py-2 inline-block rounded shadow-lg">
              🧭 EXPLORA GEO 🌍
            </h2>
            <p className="text-lg md:text-xl text-white mb-8">
              Explore bandeiras, capitais, culturas e idiomas como um verdadeiro viajante do mundo.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 items-stretch">
              <CartaoJogo titulo="🌍 Mundo das Bandeiras" descricao="Você reconhece essa bandeira?" emoji="🏁" cor="azul1" disponivel={true} onClick={() => setTelaAtual('bandeiras')} />
              <CartaoJogo titulo="🏙️ Visite as Capitais" descricao="Será que você sabe onde fica cada capital?" emoji="🏙️" cor="azul2" disponivel={true} onClick={() => setTelaAtual('capitais')} />
                            <CartaoJogo titulo="🎭 Culturas do Mundo" descricao="Tradições, curiosidades e surpresas culturais!" emoji="🎭" cor="azul3" disponivel={true} onClick={() => setTelaAtual('cultura')} />
              <CartaoJogo titulo="🗣️ Idiomas pelo Mundo" descricao="Qual idioma é falado em cada país?" emoji="🗺️" cor="azul4" disponivel={true} onClick={() => setTelaAtual('idiomas')} />
              <CartaoJogo titulo="🧭 Onde Fica?" descricao="Descubra em que continente está cada país!" emoji="🌐" cor="azul5" disponivel={true} onClick={() => setTelaAtual('geografia')} />
              <CartaoJogo
                titulo="📚 Fatos Históricos"
                descricao="Descubra curiosidades e eventos marcantes da história!"
                emoji="🏛️"
                cor="azul2"
                disponivel={true}
                onClick={() => setTelaAtual('historico')}
              />
            </div>
          </div>
        )}

        {telaAtual === 'bandeiras' && (

          <QuizBandeiras
            onAcerto={() => {
              mostrarParticulas();
              setPontos((p) => p + 1);
            }}
            pontos={pontos}
            voltar={() => setTelaAtual('inicio')}
            userId={usuarioLogado?.userId || ""} 

          />
        )}

        {telaAtual === 'capitais' && (
          <QuizCapitais
            onAcerto={() => {
              mostrarParticulas();
              setPontos((p) => p + 1);
            }}
            pontos={pontos}
            voltar={() => setTelaAtual('inicio')}
          />
        )}

        {telaAtual === 'cultura' && (
          <QuizCultura
            onAcerto={() => {
              mostrarParticulas();
              setPontos((p) => p + 1);
            }}
            pontos={pontos}
            voltar={() => setTelaAtual('inicio')}
          />
        )}

        {telaAtual === 'idiomas' && (
          <QuizIdiomas
            onAcerto={() => {
              mostrarParticulas();
              setPontos((p) => p + 1);
            }}
            pontos={pontos}
            voltar={() => setTelaAtual('inicio')}
          />
        )}

        {telaAtual === 'geografia' && (
          <QuizGeografia
            onAcerto={() => {
              mostrarParticulas();
              setPontos((p) => p + 1);
            }}
            pontos={pontos}
            voltar={() => setTelaAtual('inicio')}
          />
        )}

        {telaAtual === 'historico' && (
          <QuizHistorico
            onAcerto={() => {
              mostrarParticulas();
              setPontos((p) => p + 1);
            }}
            pontos={pontos}
            voltar={() => setTelaAtual('inicio')}
          />
        )}

        {telaAtual === 'cadastro' && (
          <div className="text-center">
            <CadastroUsuario />
            <button
              className="mt-8 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              onClick={() => setTelaAtual('inicio')}
            >
              🔙 Voltar pro começo
            </button>
          </div>
        )}

        {telaAtual === 'login' && (
          <LoginUsuario
            onLogin={handleLogin}
            voltar={() => setTelaAtual('inicio')}
          />
        )}

        {telaAtual === 'dashboard' && usuarioLogado && (
          <DashboardUsuario userId={usuarioLogado.userId} />
        )}
      </main>

      <footer className="text-center text-sm text-yellow-200 bg-blue-900/80 py-6">
        Feito com React, Tailwind e minha vontade de fazer esse projeto 💛
      </footer>
    </div>
  );
}

export default App;