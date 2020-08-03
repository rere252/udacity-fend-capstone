import { Injectable } from 'injection-js';
import { Endpoints } from '../../../common/api/endpoints';
import { BaseHttpService } from '../../../common/service/base-http.service';
import { SimpleError } from '../../../common/model/simple.error';
import swal from 'sweetalert';

@Injectable()
export class TripInfoService extends BaseHttpService {
  private readonly endpoint = `${Endpoints.Prefix}${Endpoints.TripInfo}`;

  // todo TYPEs
  postDestination(destination: string): Promise<unknown> {
    return this.axios
      .post(this.endpoint, {
        url: destination
      })
      .then((r) => r.data)
      .catch((e) => {
        const error: SimpleError = e.response.data;
        swal(error.message, error.reason, 'error');
      });
  }
}
