import {Inject} from 'injection-js';
import {BaseHttpService} from '../../common/service/base-http.service';
import {ApiKeysService} from './api-keys.service';

/**
 * Wouldn't use this API but it's an Udacity requirement so kept it as a fallback.
 */
export class GeoNamesService extends BaseHttpService {
  static get parameters() {
    return [new Inject(ApiKeysService)];
  }

  constructor(keyService) {
    super();
    this.apiUrl = `https://secure.geonames.org/geoCodeAddressJSON?username=${keyService.GEO_NAMES_USERNAME}&q=`;
  }

  getGeoCodeAddress(location) {
    return this.axios
      .get(this.getQueryUrl(location))
      .then((r) => r.data.address)
      .catch((e) => {
        console.error(e);
        throw new Error('Failed to geo code address.');
      });
  }

  getQueryUrl(location) {
    return encodeURI(`${this.apiUrl}${location}`);
  }
}
