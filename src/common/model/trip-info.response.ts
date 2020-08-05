import { WeatherInfo } from './weather-info.model';
import { ImageInfo } from './image-info.model';

export interface TripInfoResponse {
  label: string;
  weather: WeatherInfo;
  image: ImageInfo;
  departure: Date;
}
