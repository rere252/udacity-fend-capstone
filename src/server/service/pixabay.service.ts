import { Injectable } from 'injection-js';
import { BaseHttpService } from '../../common/service/base-http.service';
import { PixabayResponse } from '../model/pixabay/pixabay.response';
import { ImageInfo } from '../../common/model/image-info.model';
import { ApiKeysService } from './api-keys.service';

@Injectable()
export class PixabayService extends BaseHttpService {
  private readonly typeParam = 'image_type=photo';
  private readonly orientationParam = 'orientation=horizontal';
  private readonly safeParam = 'safesearch=true';
  private readonly categoryParam = 'category=travel';
  // 3 is the lowest possible value.
  private readonly perPageParam = 'per_page=3';
  private readonly apiUrl: string;

  constructor(apiKeys: ApiKeysService) {
    super();
    const keyParam = `key=${apiKeys.PIXABAY_API_KEY}`;
    this.apiUrl = `https://pixabay.com/api/?${keyParam}&${this.getStaticParams()}`;
  }

  async getImageInfo(country: string, city: string): Promise<ImageInfo> {
    try {
      const specificQuery = encodeURI(`${country}+${city}`);
      let imgURLs = await this.requestTheURLs(specificQuery);
      if (imgURLs.totalHits == 0) {
        const broaderQuery = encodeURI(`${country}`);
        imgURLs = await this.requestTheURLs(broaderQuery);
      }
      const hit = imgURLs.hits[0];
      const imgInf: ImageInfo = {
        largeImageUrl: hit?.largeImageURL
      };
      return Promise.resolve(imgInf);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to retrieve destination image');
    }
  }

  private requestTheURLs(query: string): Promise<PixabayResponse> {
    return this.axios.get(`${this.apiUrl}&q=${query}`).then((r) => r.data);
  }

  private getStaticParams(): string {
    const params = [this.typeParam, this.orientationParam, this.safeParam, this.perPageParam, this.categoryParam];
    return `${params.join('&')}`;
  }
}
