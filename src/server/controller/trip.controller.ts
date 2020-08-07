import { NextFunction, Request, Response } from 'express';
import { Injectable } from 'injection-js';
import { BaseController } from './base.controller';
import { GeoNamesService } from '../service/geo-names.service';
import { WeatherbitService } from '../service/weatherbit.service';
import { PixabayService } from '../service/pixabay.service';
import { HereMapsService } from '../service/here-maps.service';
import { Position } from '../model/position.model';
import { TripInfoResponse } from '../../common/model/trip-info.response';

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
    const destination: string = req.body.destination;
    const departure: Date = req.body.departure;
    try {
      const labeledPos = await this.getLabeledPosition(destination);
      const weather = await this.weatherService.getCurrentWeather(labeledPos.position);
      const image = await this.imageService.getImageInfo(labeledPos.country, labeledPos.city);
      const tripInfo: TripInfoResponse = {
        label: labeledPos.label,
        weather,
        image,
        departure
      };
      resp.json(tripInfo);
    } catch (e) {
      next(e);
    }
  }

  private async getLabeledPosition(location: string) {
    const labeledPos = {} as LabeledPosition;
    const hereLoc = await this.hereService.getAddress(location);
    if (hereLoc) {
      labeledPos.label = hereLoc.title;
      labeledPos.position = hereLoc.position;
      labeledPos.country = hereLoc.address.countryName;
      labeledPos.city = hereLoc.address.city;
    } else {
      const geoNamesAddress = await this.geoNamesService.getGeoCodeAddress(location);
      labeledPos.label = `${geoNamesAddress.locality}, ${geoNamesAddress.countryCode}`;
      labeledPos.position = {
        lat: geoNamesAddress.lat,
        lng: geoNamesAddress.lng
      };
      labeledPos.country = geoNamesAddress.countryCode;
      // Locality isn't really a city, but it could help.
      labeledPos.city = geoNamesAddress.locality;
    }
    return labeledPos;
  }
}

interface LabeledPosition {
  label: string;
  position: Position;
  city: string;
  country: string;
}
