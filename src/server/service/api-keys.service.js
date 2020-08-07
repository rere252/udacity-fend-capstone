import * as dotenv from 'dotenv';

export class ApiKeysService {
  constructor() {
    dotenv.config();
    const envars = process.env;
    this.GEO_NAMES_USERNAME = envars.GEO_NAMES_USERNAME;
    this.WEATHERBIT_API_KEY = envars.WEATHERBIT_API_KEY;
    this.PIXABAY_API_KEY = envars.PIXABAY_API_KEY;
    this.HERE_API_KEY = envars.HERE_API_KEY;
    this.validateKeys();
  }

  validateKeys() {
    if (!this.GEO_NAMES_USERNAME) {
      throw new Error('GeoNames username is missing.');
    }

    if (!this.WEATHERBIT_API_KEY) {
      throw new Error('Weatherbit API key is missing.');
    }

    if (!this.PIXABAY_API_KEY) {
      throw new Error('Pixabay API key is missing.');
    }

    if (!this.HERE_API_KEY) {
      throw new Error('Here API key is missing.');
    }
  }
}
