import { Injectable } from 'injection-js';
import { Endpoints } from '../../../common/api/endpoints';
import { BaseHttpService } from '../../../common/service/base-http.service';
import { SimpleError } from '../../../common/model/simple.error';
import swal from 'sweetalert';
import { TripInfoResponse } from '../../../common/model/trip-info.response';

@Injectable()
export class TripInfoService extends BaseHttpService {
  private readonly endpoint = `${Endpoints.Prefix}${Endpoints.TripInfo}`;

  postDestination(destination: string, departure: Date): Promise<TripInfoResponse> {
    return this.axios
      .post(this.endpoint, { destination, departure })
      .then((r) => r.data)
      .catch((e) => {
        const error: SimpleError = e.response.data;
        swal(error.message, error.reason, 'error');
      });
  }
}
