import Axios from 'axios';
import { Injectable } from 'injection-js';

@Injectable()
export abstract class BaseHttpService {
  public readonly axios = Axios;
}
