import React from 'react';

function FundoFuturista() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Imagem de fundo externa corrigida */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2013/07/12/18/35/world-153534_1280.png')",
        }}
      ></div>

     
      <div className="absolute inset-0 bg-black opacity-30 pointer-events-none"></div>
    </div>
  );
}

export default FundoFuturista;