import '@abraham/reflection';
import { Server } from './server';
import * as dotenv from 'dotenv';
import { container } from './container';

function start(): void {
  initEnvVariables();
  const server: Server = container.get(Server);
  server.init();
}

function initEnvVariables() {
  dotenv.config();
  validateEnvVariables();
}

function validateEnvVariables() {
  const envars = process.env;
  if (!envars.GEO_NAMES_USERNAME) {
    throw new Error('GeoNames username is missing.');
  }

  if (!envars.WEATHERBIT_API_KEY) {
    throw new Error('Weatherbit API key is missing.');
  }

  if (!envars.PIXABAY_API_KEY) {
    throw new Error('Pixabay API key is missing.');
  }

  if (!envars.HERE_API_KEY) {
    throw new Error('Here API key is missing.');
  }
}

start();
