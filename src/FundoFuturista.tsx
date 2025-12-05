import React from 'react';

function FundoFuturista() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
    
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2024/02/03/02/16/earth-8549451_1280.png')",
        }}
      ></div>

     
      <div className="absolute inset-0 bg-black opacity-30 pointer-events-none"></div>
    </div>
  );
}

export default FundoFuturista;