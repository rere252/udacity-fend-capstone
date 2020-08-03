import { Injectable } from 'injection-js';
import { Router } from 'express';
import { BaseController } from '../controller/base.controller';

@Injectable()
export abstract class BaseRouter {
  private readonly router = Router();

  abstract getHandlers(): [string, BaseController][];

  public init(): Router {
    for (const [route, contr] of this.getHandlers()) {
      this.router.use(route, contr.handle.bind(contr));
    }
    return this.router;
  }
}
