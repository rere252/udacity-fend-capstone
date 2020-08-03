import { DestinationController } from '../controller/destination.controller';
import { Injectable } from 'injection-js';
import { BaseRouter } from './base.router';
import { BaseController } from '../controller/base.controller';
import { Endpoints } from '../../common/api/endpoints';

@Injectable()
export class ApiRouter extends BaseRouter {
  constructor(private destinationController: DestinationController) {
    super();
  }

  getHandlers(): [string, BaseController][] {
    return [[Endpoints.DestinationInfo, this.destinationController]];
  }
}
