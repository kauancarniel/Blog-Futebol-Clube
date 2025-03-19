import { App } from './app';

const PORT = process.env.APP_PORT || 3001;
console.log(`Versão do Node.js em execução: ${process.version}`);
new App().start(PORT);
