import '@abraham/reflection';
import { Server } from './server';
import * as dotenv from 'dotenv';
import { container } from './container';

function start(): void {
  dotenv.config();

  const server: Server = container.get(Server);
  server.init();
}

start();
