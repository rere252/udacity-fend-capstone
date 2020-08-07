import { Injectable } from 'injection-js';
import { BaseHttpService } from '../../common/service/base-http.service';
import { AxiosResponse } from 'axios';
import { HereResponse } from '../model/here/here.response';
import { HereLocationItem } from '../model/here/here-location-item.model';
import { ApiKeysService } from './api-keys.service';

@Injectable()
export class HereMapsService extends BaseHttpService {
  private readonly limitParam = 'limit=1';
  private readonly langParam = 'lang=en';
  private readonly apiUrl: string;

  constructor(apiKeysService: ApiKeysService) {
    super();
    const apiKeyParam = `apiKey=${apiKeysService.HERE_API_KEY}`;
    this.apiUrl = `https://discover.search.hereapi.com/v1/geocode?${apiKeyParam}&${this.getStaticParams()}`;
  }

  getAddress(location: string): Promise<HereLocationItem> {
    return this.axios
      .get(this.getQueryUrl(location))
      .then((r: AxiosResponse<HereResponse>) => r.data?.items[0])
      .catch((e) => {
        console.error(e);
        throw new Error('Failed to get a location data from HERE');
      });
  }

  getQueryUrl(location: string): string {
    const query = encodeURI(location);
    return `${this.apiUrl}&q=${query}`;
  }

  private getStaticParams() {
    return [this.limitParam, this.langParam].join('&');
  }
}
