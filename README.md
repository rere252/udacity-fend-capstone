# Udacity Front End Web Developer Nanodegree Program Project #5: FEND Capstone - Travel App

A simple travel destination info app. Enter your desired destination and departure date and the app does the rest.

Utilizes [HERE](https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html), [Geo Names](https://www.geonames.org/maps/addresses.html#geoCodeAddress), [Pixabay](https://pixabay.com/api/docs/#api_search_images) and [Weatherbit](https://www.weatherbit.io/api) APIs.

## To Run The Project

You need [HERE](https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html), [Geo Names](https://www.geonames.org/maps/addresses.html#geoCodeAddress), [Pixabay](https://pixabay.com/api/docs/#api_search_images) and [Weatherbit](https://www.weatherbit.io/api) API keys to run the project. Add the keys to the `.env` file at the root directory (you need to create the file).

To resolve dependencies run `npm install`. To launch the production build run `npm start`. The server will be started on port `8081`. To start the app in development configuration run `npm run start-dev`. The client app will then be accessible from port `8080` while backend is running on port `8081`. In this case the API requests are proxied to the backend server.

## .env keys

Should be added in the format of `PIXABAY_API_KEY=your_key_here`.

- `GEO_NAMES_USERNAME`: Username for [Geo Names](https://www.geonames.org/maps/addresses.html#geoCodeAddress).
- `WEATHERBIT_API_KEY`: Key for [Weatherbit](https://www.weatherbit.io/api).
- `PIXABAY_API_KEY`: Key for [Pixabay](https://pixabay.com/api/docs/#api_search_images).
- `HERE_API_KEY`: Key for [HERE](https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html)
