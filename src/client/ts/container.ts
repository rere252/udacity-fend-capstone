import { Client } from './client';
import { DestinationService } from './service/destination.service';
import { ReflectiveInjector } from 'injection-js';

const declarations = [Client, DestinationService];

export const container = ReflectiveInjector.resolveAndCreate(declarations);
