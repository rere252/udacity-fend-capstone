import * as bodyParser from 'body-parser';
import * as express from 'express';
import {ApiRouter} from './route/api.router';
import {handleError} from './util/error-handler';
import {Inject} from 'injection-js';
const Endpoints = require('../common/api/endpoints');

export class Server {
  static get parameters() {
    return [new Inject(ApiRouter)];
  }

  constructor(apiRouter) {
    this.port = 8081;
    this.app = express();
    this.apiRouter = apiRouter;
  }

  init() {
    this.app.use(bodyParser.json());
    // Serve static site.
    this.app.use(express.static('dist/client'));
    // API's
    this.app.use(Endpoints.Prefix, this.apiRouter.init());
    // Catch all errors.
    // eslint-disable-next-line no-unused-vars
    this.app.use((err, req, res, next) => handleError(err, res));
    // Start the server.
    this.app.listen(this.port, () => console.log(`Server started on ${this.port}.`));
  }
}
