import { WeatherDescription } from './weather-description.model';

export interface WeatherInfo {
  country_code: string;
  wind_spd: string;
  temp: number;
  /** Percentage */
  clouds: number;
  weather: WeatherDescription;
}
