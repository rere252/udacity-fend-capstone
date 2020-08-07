import {BaseHttpService} from '../../common/service/base-http.service';
import {ApiKeysService} from './api-keys.service';
import {Inject} from 'injection-js';

export class WeatherbitService extends BaseHttpService {
  static get parameters() {
    return [new Inject(ApiKeysService)];
  }

  constructor(keyService) {
    super();
    this.baseUrl = 'https://api.weatherbit.io/v2.0';
    const keyParam = `key=${keyService.WEATHERBIT_API_KEY}`;
    this.currentWeatherUrl = `${this.baseUrl}/current?${keyParam}`;
    this.weatherForecastUrl = `${this.baseUrl}/forecast/daily?${keyParam}`;
  }

  getCurrentWeather(position) {
    return this.getWeatherByLatLon(this.currentWeatherUrl, position);
  }

  getWeatherForecast(position) {
    return this.getWeatherByLatLon(this.weatherForecastUrl, position);
  }

  getWeatherByLatLon(url, position) {
    return (
      this.axios
        .get(this.getLatLonUrl(url, position))
        // axios response data + api data
        .then((r) => this.removeExcessProps(r.data.data[0]))
        .catch((e) => {
          console.error(e);
          throw new Error('Failed to get weather data.');
        })
    );
  }

  getLatLonUrl(endpointUrl, position) {
    const pos = position;
    return `${endpointUrl}&lat=${pos.lat}&lon=${pos.lng}`;
  }

  removeExcessProps(weatherInfo) {
    const {country_code, temp, clouds, weather, wind_spd} = weatherInfo;
    return {country_code, temp, clouds, weather, wind_spd};
  }
}
