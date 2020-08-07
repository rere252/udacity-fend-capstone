import {BaseRouter} from './base.router';
import {Inject} from 'injection-js';
import {TripController} from '../controller/trip.controller';
const Endpoints = require('../../../src/common/api/endpoints');

export class ApiRouter extends BaseRouter {
  static get parameters() {
    return [new Inject(TripController)];
  }

  constructor(tripController) {
    super();
    this.tripController = tripController
  }

  getHandlers() {
    return [[Endpoints.TripInfo, this.tripController]];
  }
}
