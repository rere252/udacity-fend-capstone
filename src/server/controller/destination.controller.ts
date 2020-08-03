import { NextFunction, Request, Response } from 'express';
import { Injectable } from 'injection-js';
import { BaseController } from './base.controller';

@Injectable()
export class DestinationController extends BaseController {
  constructor() {
    super();
  }

  //TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(req: Request, resp: Response, next: NextFunction): void {
    /*     const sar: SubmitArticleRequest = req.body;
    this.articleService
      .getArticle(sar)
      .then((parsed) => this.meaningCloudService.analyzeSentiment(parsed))
      .then((result) => resp.send(result))
      .catch((e) => next(e)); */
  }
}
