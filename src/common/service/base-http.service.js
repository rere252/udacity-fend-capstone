import axios from 'axios';

export class BaseHttpService {
  constructor() {
    this.axios = axios;
  }
}
