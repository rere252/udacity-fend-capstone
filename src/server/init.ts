import '@abraham/reflection';
import { Server } from './server';
import * as dotenv from 'dotenv';
import { container } from './container';

function start(): void {
  dotenv.config();

  if (!process.env.GEO_NAMES_USERNAME) {
    throw new Error('GeoNames username is missing.');
  }

  const server: Server = container.get(Server);
  server.init();
}

start();
