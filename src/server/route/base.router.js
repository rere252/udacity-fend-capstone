import {Router} from 'express';

export class BaseRouter {
  constructor() {
    this.router = Router();
  }

  getHandlers() {
    throw new TypeError('getHandlers() not implemented');
  }

  init() {
    for (const [route, contr] of this.getHandlers()) {
      this.router.use(route, contr.handle.bind(contr));
    }
    return this.router;
  }
}
