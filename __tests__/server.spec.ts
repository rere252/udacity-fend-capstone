import axios from 'axios';
import 'reflect-metadata';
import { container } from '../src/server/container';
import { GeoNamesService } from '../src/server/service/geo-names.service';
import { HereMapsService } from '../src/server/service/here-maps.service';
import { AddressInfo } from 'net';
import { PixabayService } from '../src/server/service/pixabay.service';
import { ImageInfo } from '../src/common/model/image-info.model';
import { PixabayResponse } from '../src/server/model/pixabay/pixabay.response';
import { WeatherbitService } from '../src/server/service/weatherbit.service';
import { WeatherInfo } from '../src/common/model/weather-info.model';
import { Position } from '../src/server/model/position.model';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Server-side services', () => {
  const loc = 'new-york';

  test('Geo Names service', () => {
    const geoService: GeoNamesService = container.get(GeoNamesService);
    const expected = JSON.parse(
      '{"adminCode2":"0793","sourceId":"3098446","adminCode3":"","adminCode1":"18","lng":"26.76731","houseNumber":"173b","locality":"Tartu","adminCode4":"","adminName2":"Tartu linn","street":"Jaama tn","postalcode":"50705","countryCode":"EE","adminName1":"Tartu","lat":"58.37961"}'
    );
    mockedAxios.get.mockResolvedValueOnce({ data: { address: expected } });
    return geoService.getGeoCodeAddress(loc).then((addr) => {
      expect(mockedAxios.get).toHaveBeenCalledWith(geoService.getQueryUrl(loc));
      expect(addr).toEqual(expected);
    });
  });

  test('HERE service', () => {
    const hereService: HereMapsService = container.get(HereMapsService);
    const expected: AddressInfo = JSON.parse(
      '{"title":"New York, NY, United States","id":"here:cm:namedplace:21019301","resultType":"locality","localityType":"city","address":{"label":"New York, NY, United States","countryCode":"USA","countryName":"United States","state":"New York","county":"New York","city":"New York","postalCode":"10007"},"position":{"lat":40.71455,"lng":-74.00714},"mapView":{"west":-74.2589,"south":40.47742,"east":-73.70038,"north":40.91762},"scoring":{"queryScore":1,"fieldScore":{"city":1}}}'
    );
    mockedAxios.get.mockResolvedValueOnce({ data: { items: [expected] } });
    return hereService.getAddress(loc).then((addr) => {
      expect(mockedAxios.get).toHaveBeenCalledWith(hereService.getQueryUrl(loc));
      expect(addr).toEqual(expected);
    });
  });

  test('Pixabay service', () => {
    const pixService: PixabayService = container.get(PixabayService);
    const expected: ImageInfo = {
      largeImageUrl:
        'https://pixabay.com/get/52e8d6444e52aa14f6da8c7dda7936791239dbec51536c4870267ddc9748c15ab0_1280.jpg'
    };
    const resp: PixabayResponse = {
      totalHits: 1,
      hits: [{ largeImageURL: expected.largeImageUrl }]
    };
    mockedAxios.get.mockResolvedValueOnce({ data: resp });
    return expect(pixService.getImageInfo('Estonia', 'Jõhvi')).resolves.toEqual(expected);
  });

  const weatherbit: WeatherbitService = container.get(WeatherbitService);
  test('Weatherbit service, current', () => {
    const position: Position = { lat: 40.71455, lng: -74.00714 };
    const expected: WeatherInfo = JSON.parse(
      '{"country_code":"US","temp":22,"clouds":100,"weather":{"icon":"r02d","code":"501","description":"Moderate rain"},"wind_spd":4.63}'
    );
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [expected] } });
    return expect(weatherbit.getCurrentWeather(position)).resolves.toEqual(expected);
  });

  test('Weatherbit service, forecast', () => {
    const position: Position = {
      lat: 58.37621,
      lng: 26.72573
    };
    const expected: WeatherInfo = JSON.parse(
      '{"temp":20.5,"clouds":85,"weather":{"icon":"c04d","code":804,"description":"Overcast clouds"},"wind_spd":1.83253}'
    );
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [expected] } });
    return expect(weatherbit.getWeatherForecast(position)).resolves.toEqual(expected);
  });
});
