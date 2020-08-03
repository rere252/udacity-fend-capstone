import { Injectable } from 'injection-js';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export abstract class BaseController {
  abstract handle(req: Request, resp: Response, next: NextFunction): void;
}
