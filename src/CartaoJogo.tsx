import React from 'react';
import { Play, Star } from 'lucide-react';

type Props = {
  titulo: string;
  descricao: string;
  emoji: string;
  cor: 'blue';
  disponivel: boolean;
  onClick: () => void;
};

const CartaoJogo = ({ titulo, descricao, emoji, cor, disponivel, onClick }: Props) => {
  const coresCard = {
    blue: 'from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700',
  };

  return (
    <div
      className={`group relative bg-blue-600/30 backdrop-blur-md rounded-3xl p-8 transition-all duration-500 border border-white/20 shadow-xl ${
        disponivel
          ? 'cursor-pointer hover:scale-105 hover:shadow-2xl hover:border-white/40'
          : 'opacity-60 cursor-not-allowed'
      }`}
      onClick={disponivel ? onClick : undefined}
    >
      {!disponivel && (
        <div className="absolute top-4 right-4 bg-cyan-300 text-blue-800 text-sm font-black px-4 py-2 rounded-full border-2 border-cyan-200 shadow-lg">
          Em breve!
        </div>
      )}

      <div className="text-center">
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </div>

        <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-200 transition-colors">
          {titulo}
        </h3>
        <p className="text-white/90 mb-6 leading-relaxed font-semibold text-lg">{descricao}</p>

        {disponivel && (
          <button
            className={`w-full bg-gradient-to-r ${coresCard[cor]} text-white py-4 px-6 rounded-2xl font-black text-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-3 group-hover:scale-105 border-4 border-white/50 shadow-lg`}
          >
            <Play className="w-5 h-5" />
            <span>JOGAR</span>
            <Star className="w-5 h-5 animate-pulse" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CartaoJogo;
