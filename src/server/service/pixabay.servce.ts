import { Injectable } from 'injection-js';
import { BaseHttpService } from '../../common/service/base-http.service';

@Injectable()
export class PixabayService extends BaseHttpService {
  private readonly keyParam = `key=${process.env.PIXABAY_API_KEY}`;
  private readonly typeParam = 'image_type=photo';
  private readonly categoryParam = 'category=travel';
  private readonly orientationParam = 'orientation=horizontal';
  private readonly safeParam = 'safesearch=true';
  // 3 is the lowest possible value.
  private readonly perPageParam = 'per_page=3';
  private readonly apiUrl = `https://pixabay.com/api/${this.getStaticParams()}`;

  getImageUrls(countryCode: string, city: string): Promise<unknown> {
    const query = encodeURI(`&q=${countryCode}+${city}`);
    return this.axios
      .get(`${this.apiUrl}&${query}`)
      .then((r) => r.data)
      .catch((e) => {
        console.error(e);
        throw new Error('Failed to retrieve destination image');
      });
  }

  private getStaticParams(): string {
    const params = [
      this.keyParam,
      this.typeParam,
      this.categoryParam,
      this.orientationParam,
      this.safeParam,
      this.perPageParam
    ];
    return `?${params.join('&')}`;
  }
}
