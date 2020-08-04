import { WeatherInfo } from './weather-info.model';

export interface TripInfoResponse {
  label: string;
  weather: WeatherInfo;
  imageUrl: string;
}
