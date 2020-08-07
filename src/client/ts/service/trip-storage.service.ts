import { Injectable } from 'injection-js';
import { TripInfoResponse } from '../../../common/model/trip-info.response';

@Injectable()
export class TripStorageService {
  private readonly tripKey = 'trip';

  getLastSavedTrip(): TripInfoResponse {
    return JSON.parse(localStorage.getItem(this.tripKey));
  }

  saveTrip(trip: TripInfoResponse): void {
    localStorage.setItem(this.tripKey, JSON.stringify(trip));
  }
}
