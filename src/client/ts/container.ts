import { Client } from './client';
import { TripInfoService } from './service/trip-info.service';
import { ReflectiveInjector } from 'injection-js';

const declarations = [Client, TripInfoService];

export const container = ReflectiveInjector.resolveAndCreate(declarations);
