import { Injectable } from 'injection-js';
import { BaseHttpService } from '../../common/service/base-http.service';
import { GeoCodeAddress } from '../model/geo-code-address.model';
import { WeatherInfo } from '../../common/model/weather-info.model';

@Injectable()
export class WeatherbitService extends BaseHttpService {
  private readonly apiKey = process.env.WEATHERBIT_API_KEY;
  private readonly keyArg = `key=${this.apiKey}`;
  private readonly baseUrl = 'https://api.weatherbit.io/v2.0';
  private readonly currentWeatherUrl = `${this.baseUrl}/current?${this.keyArg}`;
  private readonly weatherForecastUrl = `${this.baseUrl}/forecast/daily?${this.keyArg}`;

  getCurrentWeather(geoAddr: GeoCodeAddress): Promise<WeatherInfo> {
    return this.getWeatherByLatLon(this.currentWeatherUrl, geoAddr);
  }

  getWeatherForecast(geoAddr: GeoCodeAddress): Promise<WeatherInfo> {
    return this.getWeatherByLatLon(this.weatherForecastUrl, geoAddr);
  }

  private getWeatherByLatLon(url: string, geoAddr): Promise<WeatherInfo> {
    return this.axios
      .get(this.getLatLonUrl(url, geoAddr))
      .then((r) => r.data)
      .catch(() => {
        throw new Error('Failed to get weather data.');
      });
  }

  private getLatLonUrl(endpointUrl: string, geoAddr: GeoCodeAddress) {
    const adr = geoAddr;
    return `${endpointUrl}&lat=${adr.lat}&lon=${adr.lng}`;
  }
}
