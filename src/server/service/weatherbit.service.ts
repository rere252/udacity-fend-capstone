import { Injectable } from 'injection-js';
import { WeatherInfo } from '../../common/model/weather-info.model';
import { BaseHttpService } from '../../common/service/base-http.service';
import { Position } from '../model/position.model';

@Injectable()
export class WeatherbitService extends BaseHttpService {
  private readonly apiKey = process.env.WEATHERBIT_API_KEY;
  private readonly keyArg = `key=${this.apiKey}`;
  private readonly baseUrl = 'https://api.weatherbit.io/v2.0';
  private readonly currentWeatherUrl = `${this.baseUrl}/current?${this.keyArg}`;
  private readonly weatherForecastUrl = `${this.baseUrl}/forecast/daily?${this.keyArg}`;

  getCurrentWeather(position: Position): Promise<WeatherInfo> {
    return this.getWeatherByLatLon(this.currentWeatherUrl, position);
  }

  getWeatherForecast(position: Position): Promise<WeatherInfo> {
    return this.getWeatherByLatLon(this.weatherForecastUrl, position);
  }

  private getWeatherByLatLon(url: string, position: Position): Promise<WeatherInfo> {
    return this.axios
      .get(this.getLatLonUrl(url, position))
      .then((r) => r.data)
      .catch(() => {
        throw new Error('Failed to get weather data.');
      });
  }

  private getLatLonUrl(endpointUrl: string, position: Position) {
    const adr = position;
    return `${endpointUrl}&lat=${adr.lat}&lon=${adr.lng}`;
  }
}
