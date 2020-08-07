/* eslint-disable no-undef */
import axios from 'axios';
import 'reflect-metadata';
import {container} from '../src/client/js/container';
import {TripInfoService} from '../src/client/js/service/trip-info.service';
import {TripStorageService} from '../src/client/js/service/trip-storage.service';
const Endpoints = require('../src/common/api/endpoints');

jest.mock('axios');

describe('Client-side services', () => {
  const expected = JSON.parse(
    '{"label":"New York, NY, United States","weather":{"temp":21.7,"clouds":89,"weather":{"icon":"t03d","code":202,"description":"Thunderstorm with heavy rain"},"wind_spd":3.33249},"image":{"largeImageUrl":"https://pixabay.com/get/5ee2dd444d55b108f5d0846096293079133ad7e7514c704c7c297cdd9f45c35d_1280.jpg"},"departure":"2020-08-15T00:00:00.000Z"}'
  );

  test('Getting trip info', () => {
    const infoService = container.get(TripInfoService);
    axios.post.mockResolvedValueOnce({data: expected});
    return infoService.postDestination('new-york', new Date('2020-08-15T00:00:00.000Z')).then((result) => {
      expect(axios.post).toHaveBeenCalledWith(`${Endpoints.Prefix}${Endpoints.TripInfo}`, {
        destination: 'new-york',
        departure: new Date('2020-08-15T00:00:00.000Z')
      });
      expect(result).toEqual(expected);
    });
  });

  test('Saving trip to local storage', () => {
    const storage = container.get(TripStorageService);
    storage.saveTrip(expected);
    const saved = storage.getLastSavedTrip();
    expect(saved).toEqual(expected);
  });
});
