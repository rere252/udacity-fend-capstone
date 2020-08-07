import swal from 'sweetalert';
import {BaseHttpService} from '../../../common/service/base-http.service';
const Endpoints = require('../../../common/api/endpoints');

export class TripInfoService extends BaseHttpService {
  constructor() {
    super()
    this.endpoint = `${Endpoints.Prefix}${Endpoints.TripInfo}`;
  }

  postDestination(destination, departure) {
    return this.axios
      .post(this.endpoint, {destination, departure})
      .then((r) => r.data)
      .catch((e) => {
        const error = e.response.data;
        swal(error.message, error.reason, 'error');
      });
  }
}
