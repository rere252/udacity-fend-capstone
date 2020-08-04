import { NextFunction, Request, Response } from 'express';
import { Injectable } from 'injection-js';
import { BaseController } from './base.controller';
import { GeoNamesService } from '../service/geo-names.service';
import { WeatherbitService } from '../service/weatherbit.service';
import { PixabayService } from '../service/pixabay.servce';
import { HereMapsService } from '../service/here-maps.service';
import { Position } from '../model/position.model';

@Injectable()
export class TripController extends BaseController {
  constructor(
    private hereService: HereMapsService,
    private geoNamesService: GeoNamesService,
    private weatherService: WeatherbitService,
    private imageService: PixabayService
  ) {
    super();
  }

  //TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async handle(req: Request, resp: Response, next: NextFunction) {
    const location = 'võru';
    try {
      let locationLabel: string;
      let locPosition: Position;
      const hereLoc = await this.hereService.getAddress(location);
      if (hereLoc) {
        locationLabel = hereLoc.title;
        locPosition = hereLoc.position;
      } else {
        const geoNamesAddress = await this.geoNamesService.getGeoCodeAddress(location);
        locationLabel = `${geoNamesAddress.locality}, ${geoNamesAddress.countryCode}`;
        locPosition = {
          lat: geoNamesAddress.lat,
          lng: geoNamesAddress.lng
        };
      }
      const weather = await this.weatherService.getCurrentWeather(locPosition);
      const imageUrls = await this.imageService.getImageUrls('estonia', location);
      console.log(locationLabel);
      console.log(weather);
      console.log(imageUrls);
      resp.json({
        locationLabel,
        weather,
        imageUrls
      });
    } catch (e) {
      next(e);
    }
  }
}
