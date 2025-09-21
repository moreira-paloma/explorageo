const fs = require('fs');
const path = require('path');

// Caminho do arquivo tsconfig.node.json na raiz
const tsconfigNodePath = path.resolve(__dirname, 'tsconfig.node.json');

// Verifica se o arquivo existe
const tsconfigNodeExists = fs.existsSync(tsconfigNodePath);

console.log('Caminho do tsconfig.node.json:', tsconfigNodePath);
console.log('O arquivo tsconfig.node.json existe?', tsconfigNodeExists ? 'Sim' : 'Não');
