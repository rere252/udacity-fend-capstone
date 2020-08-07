import {Inject} from 'injection-js';
import {BaseHttpService} from '../../common/service/base-http.service';
import {ApiKeysService} from './api-keys.service';

export class PixabayService extends BaseHttpService {
  static get parameters() {
    return [new Inject(ApiKeysService)];
  }

  constructor(apiKeys) {
    super();
    this.typeParam = 'image_type=photo';
    this.orientationParam = 'orientation=horizontal';
    this.safeParam = 'safesearch=true';
    this.categoryParam = 'category=travel';
    // 3 is the lowest possible value.
    this.perPageParam = 'per_page=3';
    const keyParam = `key=${apiKeys.PIXABAY_API_KEY}`;
    this.apiUrl = `https://pixabay.com/api/?${keyParam}&${this.getStaticParams()}`;
  }

  async getImageInfo(country, city) {
    try {
      const specificQuery = encodeURI(`${country}+${city}`);
      let imgURLs = await this.requestTheURLs(specificQuery);
      if (imgURLs.totalHits == 0) {
        const broaderQuery = encodeURI(`${country}`);
        imgURLs = await this.requestTheURLs(broaderQuery);
      }
      const hit = imgURLs.hits[0];
      const imgInf = {
        largeImageUrl: hit.largeImageURL
      };
      return Promise.resolve(imgInf);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve destination image');
    }
  }

  requestTheURLs(query) {
    return this.axios.get(`${this.apiUrl}&q=${query}`).then((r) => r.data);
  }

  getStaticParams() {
    const params = [this.typeParam, this.orientationParam, this.safeParam, this.perPageParam, this.categoryParam];
    return `${params.join('&')}`;
  }
}
