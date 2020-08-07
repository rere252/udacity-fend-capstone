export class BaseController {
  // eslint-disable-next-line no-unused-vars
  handle(req, resp, next) {
    throw new TypeError('handle method not implemented');
  }
}
