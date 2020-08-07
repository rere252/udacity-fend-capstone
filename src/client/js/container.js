import { Client } from './client';
import { TripInfoService } from './service/trip-info.service';
import { ReflectiveInjector } from 'injection-js';
import { TripStorageService } from './service/trip-storage.service';

const declarations = [Client, TripInfoService, TripStorageService];

export const container = ReflectiveInjector.resolveAndCreate(declarations);
