import '@abraham/reflection';
import { Server } from './server';
import { container } from './container';

function start(): void {
  const server: Server = container.get(Server);
  server.init();
}

start();
