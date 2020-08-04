/**
 * Only the properties which this app is interested in.
 */
export interface GeoCodeAddress {
  lng: number;
  lat: number;
  countryCode: string;
  /** City */
  adminName2: string;
}
