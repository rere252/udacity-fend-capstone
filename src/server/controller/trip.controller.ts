import { NextFunction, Request, Response } from 'express';
import { Injectable } from 'injection-js';
import { BaseController } from './base.controller';
import { GeoNamesService } from '../service/geo-names.service';
import { WeatherbitService } from '../service/weatherbit.service';

@Injectable()
export class TripController extends BaseController {
  constructor(private geoNamesService: GeoNamesService, private weatherService: WeatherbitService) {
    super();
  }

  //TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(req: Request, resp: Response, next: NextFunction): void {
    this.geoNamesService
      .getGeoCodeAddress('Tartu')
      .then((r) => this.weatherService.getCurrentWeather(r))
      .then((r) => resp.send(r))
      .catch((e) => next(e));
    /*     const sar: SubmitArticleRequest = req.body;
    this.articleService
      .getArticle(sar)
      .then((parsed) => this.meaningCloudService.analyzeSentiment(parsed))
      .then((result) => resp.send(result))
      .catch((e) => next(e)); */
  }
}
