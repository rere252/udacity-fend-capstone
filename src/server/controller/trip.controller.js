import {Inject} from 'injection-js';
import {daysBetween} from '../../common/util';
import {GeoNamesService} from '../service/geo-names.service';
import {HereMapsService} from '../service/here-maps.service';
import {PixabayService} from '../service/pixabay.service';
import {WeatherbitService} from '../service/weatherbit.service';
import {BaseController} from './base.controller';

export class TripController extends BaseController {
  static get parameters() {
    return [new Inject(HereMapsService), new Inject(GeoNamesService), new Inject(WeatherbitService), new Inject(PixabayService)];
  }

  constructor(
    hereService,
    geoNamesService,
    weatherService,
    imageService
  ) {
    super();
    this.hereService = hereService;
    this.geoNamesService = geoNamesService;
    this.weatherService = weatherService;
    this.imageService = imageService;
  }

  async handle(req, resp, next) {
    const destination = req.body.destination;
    const departure = new Date(req.body.departure);
    try {
      const labeledPos = await this.getLabeledPosition(destination);
      const daysUntilTrip = daysBetween(departure, new Date());
      let weather;
      if (daysUntilTrip <= 7) {
        weather = await this.weatherService.getCurrentWeather(labeledPos.position);
      } else {
        weather = await this.weatherService.getWeatherForecast(labeledPos.position);
      }
      const image = await this.imageService.getImageInfo(labeledPos.country, labeledPos.city);
      const tripInfo = {
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

  async getLabeledPosition(location) {
    const labeledPos = {};
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

