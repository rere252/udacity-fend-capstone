import '../styles/main.scss';
import '@abraham/reflection';
import { Client } from './client';
import { container } from './container';

function start(): void {
  // Check that service workers are supported
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').catch(() => console.warn('Ignore if in dev mode'));
    });
  }
  const client: Client = container.get(Client);
  client.init();
}

start();
