import { Injectable } from 'injection-js';
import { WeatherInfo } from '../../common/model/weather-info.model';
import { BaseHttpService } from '../../common/service/base-http.service';
import { Position } from '../model/position.model';
import { ApiKeysService } from './api-keys.service';

@Injectable()
export class WeatherbitService extends BaseHttpService {
  private readonly baseUrl = 'https://api.weatherbit.io/v2.0';
  private readonly currentWeatherUrl: string;
  private readonly weatherForecastUrl: string;

  constructor(keyService: ApiKeysService) {
    super();
    const keyParam = `key=${keyService.WEATHERBIT_API_KEY}`;
    this.currentWeatherUrl = `${this.baseUrl}/current?${keyParam}`;
    this.weatherForecastUrl = `${this.baseUrl}/forecast/daily?${keyParam}`;
  }

  getCurrentWeather(position: Position): Promise<WeatherInfo> {
    return this.getWeatherByLatLon(this.currentWeatherUrl, position);
  }

  getWeatherForecast(position: Position): Promise<WeatherInfo> {
    return this.getWeatherByLatLon(this.weatherForecastUrl, position);
  }

  private getWeatherByLatLon(url: string, position: Position): Promise<WeatherInfo> {
    return (
      this.axios
        .get(this.getLatLonUrl(url, position))
        // axios response data + api data
        .then((r) => this.removeExcessProps(r.data?.data[0]))
        .catch((e) => {
          console.error(e);
          throw new Error('Failed to get weather data.');
        })
    );
  }

  private getLatLonUrl(endpointUrl: string, position: Position) {
    const pos = position;
    return `${endpointUrl}&lat=${pos.lat}&lon=${pos.lng}`;
  }

  private removeExcessProps(weatherInfo: WeatherInfo): WeatherInfo {
    const { country_code, temp, clouds, weather, wind_spd } = weatherInfo;
    return { country_code, temp, clouds, weather, wind_spd };
  }
}
