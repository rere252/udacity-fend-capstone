import { Injectable } from 'injection-js';
import { BaseHttpService } from '../../common/service/base-http.service';
import { GeoCodeAddress } from '../model/geo-code-address.model';
import { AxiosResponse } from 'axios';
import { GeonamesResponse } from '../model/geonames.response';

@Injectable()
export class GeoNamesService extends BaseHttpService {
  private readonly apiUrl = `https://secure.geonames.org/geoCodeAddressJSON?username=${process.env.GEO_NAMES_USERNAME}&q=`;

  getGeoCodeAddress(location: string): Promise<GeoCodeAddress> {
    return this.axios
      .get(this.getQueryUrl(location))
      .then((r: AxiosResponse<GeonamesResponse>) => r.data.address)
      .catch((e) => {
        console.error(e);
        throw new Error('Failed to geo code address.');
      });
  }

  private getQueryUrl(location: string): string {
    return `${this.apiUrl}${location}`;
  }
}
