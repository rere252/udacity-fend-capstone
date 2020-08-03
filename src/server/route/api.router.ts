import { TripController } from '../controller/trip.controller';
import { Injectable } from 'injection-js';
import { BaseRouter } from './base.router';
import { BaseController } from '../controller/base.controller';
import { Endpoints } from '../../common/api/endpoints';

@Injectable()
export class ApiRouter extends BaseRouter {
  constructor(private destinationController: TripController) {
    super();
  }

  getHandlers(): [string, BaseController][] {
    return [[Endpoints.TripInfo, this.destinationController]];
  }
}
