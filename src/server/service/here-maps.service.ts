import { Injectable } from 'injection-js';
import { BaseHttpService } from '../../common/service/base-http.service';
import { AxiosResponse } from 'axios';
import { HereResponse } from '../model/here/here.response';
import { HereLocationItem } from '../model/here/here-location-item.model';

@Injectable()
export class HereMapsService extends BaseHttpService {
  private readonly keyParam = `apiKey=${process.env.HERE_API_KEY}`;
  private readonly limitParam = 'limit=1';
  private readonly apiUrl = `https://discover.search.hereapi.com/v1/geocode?${this.getStaticParams()}`;

  getAddress(location: string): Promise<HereLocationItem> {
    return this.axios
      .get(this.getQueryUrl(location))
      .then((r: AxiosResponse<HereResponse>) => r.data?.items[0])
      .catch((e) => {
        console.error(e);
        throw new Error('Failed to get a location data from HERE');
      });
  }

  private getQueryUrl(location: string) {
    const query = encodeURI(location);
    return `${this.apiUrl}&q=${query}`;
  }

  private getStaticParams() {
    return [this.keyParam, this.limitParam].join('&');
  }
}
