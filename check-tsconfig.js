const fs = require('fs');
const path = require('path');


const tsconfigNodePath = path.resolve(__dirname, 'tsconfig.node.json');


const tsconfigNodeExists = fs.existsSync(tsconfigNodePath);

console.log('Caminho do tsconfig.node.json:', tsconfigNodePath);
console.log('O arquivo tsconfig.node.json existe?', tsconfigNodeExists ? 'Sim' : 'Não');
