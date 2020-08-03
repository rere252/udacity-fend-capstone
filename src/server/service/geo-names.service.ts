import { Injectable } from 'injection-js';
import { BaseHttpService } from '../../common/service/base-http.service';

@Injectable()
export class GeoNamesService extends BaseHttpService {
  private readonly apiUrl = `http://api.geonames.org/geoCodeAddressJSON?username=${process.env.GEO_NAMES_USERNAME}&q=`;

  getGeoCodeAddress(location: string): Promise<unknown> {
    return this.axios
      .get(this.getQueryUrl(location))
      .then((r) => {
        console.log(r.data);
        return r.data;
      })
      .catch((e) => {
        console.error(e);
        throw new Error('Failed to geo code address.');
      });
  }

  getQueryUrl(location: string): string {
    return `${this.apiUrl}${location}`;
  }
}
