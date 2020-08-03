import { DestinationController } from './controller/destination.controller';
import { ApiRouter } from './route/api.router';
import { Server } from './server';
import { ReflectiveInjector } from 'injection-js';

const controllers = [DestinationController];
const routers = [ApiRouter];
const services = [];
const util = [];

const declarations = [...controllers, ...routers, ...services, ...util, Server];

export const container = ReflectiveInjector.resolveAndCreate(declarations);
