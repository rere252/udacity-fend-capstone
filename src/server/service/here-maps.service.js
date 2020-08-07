import {Inject} from 'injection-js';
import {BaseHttpService} from '../../common/service/base-http.service';
import {ApiKeysService} from './api-keys.service';

export class HereMapsService extends BaseHttpService {
  static get parameters() {
    return [new Inject(ApiKeysService)];
  }

  constructor(apiKeysService) {
    super();
    this.limitParam = 'limit=1';
    this.langParam = 'lang=en';
    const apiKeyParam = `apiKey=${apiKeysService.HERE_API_KEY}`;
    this.apiUrl = `https://discover.search.hereapi.com/v1/geocode?${apiKeyParam}&${this.getStaticParams()}`;
  }

  getAddress(location) {
    return this.axios
      .get(this.getQueryUrl(location))
      .then((r) => r.data.items[0])
      .catch((e) => {
        console.error(e);
        throw new Error('Failed to get a location data from HERE');
      });
  }

  getQueryUrl(location) {
    const query = encodeURI(location);
    return `${this.apiUrl}&q=${query}`;
  }

  getStaticParams() {
    return [this.limitParam, this.langParam].join('&');
  }
}
