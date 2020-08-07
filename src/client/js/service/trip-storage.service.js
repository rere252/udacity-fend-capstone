
export class TripStorageService {
  constructor() {
    this.tripKey = 'trip';
  }

  getLastSavedTrip() {
    return JSON.parse(localStorage.getItem(this.tripKey));
  }

  saveTrip(trip) {
    localStorage.setItem(this.tripKey, JSON.stringify(trip));
  }
}
