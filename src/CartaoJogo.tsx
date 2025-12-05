import React from 'react';

interface Props {
  titulo: string;
  descricao: string;
  cor: string;
  emoji: string;
  disponivel: boolean;
  onClick: () => void;
}


const cores: Record<string, string> = {
  azul1: 'from-blue-900 to-blue-700',
  azul2: 'from-indigo-900 to-indigo-700',
  azul3: 'from-purple-900 to-purple-700',
  azul4: 'from-cyan-900 to-cyan-700',
  azul5: 'from-teal-900 to-teal-700',
  padrao: 'from-gray-800 to-gray-600',
};

const CartaoJogo: React.FC<Props> = ({
  titulo,
  descricao,
  emoji,
  disponivel,
  onClick,
}) => {
 
  const gradiente = cores.azul1;

  return (
    <div
      onClick={disponivel ? onClick : undefined}
      className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1
        ${disponivel ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-40'}
        bg-gradient-to-br ${gradiente}
        text-white border border-white/10 shadow-lg hover:shadow-xl relative`}
    >
    <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold mb-2">{titulo}</h3>
      <p className="text-sm opacity-90">{descricao}</p>
    </div>
  );
};

export default CartaoJogo;