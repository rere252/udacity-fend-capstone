import { TripController } from './controller/trip.controller';
import { ApiRouter } from './route/api.router';
import { Server } from './server';
import { ReflectiveInjector } from 'injection-js';
import { GeoNamesService } from './service/geo-names.service';

const controllers = [TripController];
const routers = [ApiRouter];
const services = [GeoNamesService];
const util = [];

const declarations = [...controllers, ...routers, ...services, ...util, Server];

export const container = ReflectiveInjector.resolveAndCreate(declarations);
