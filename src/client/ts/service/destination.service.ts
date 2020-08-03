import { Injectable } from 'injection-js';
import { Endpoints } from '../../../common/api/endpoints';
import { BaseHttpService } from '../../../common/service/base-http.service';

@Injectable()
export class DestinationService extends BaseHttpService {
  private readonly endpoint = `${Endpoints.Prefix}${Endpoints.DestinationInfo}`;

  // todo TYPEs
  postDestination(destination: string): void {
    console.log(destination);
    /*     return this.axios
      .post(this.endpoint, {
        url: destination
      })
      .then((r) => r.data)
      .catch((e) => {
        const error: SimpleError = e.response.data;
        swal(error.message, error.reason, 'error');
      }); */
  }
}
