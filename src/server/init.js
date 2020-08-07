import '@abraham/reflection';
import {Server} from './server';
import {container} from './container';

function start() {
  const server = container.get(Server);
  server.init();
}

start();
