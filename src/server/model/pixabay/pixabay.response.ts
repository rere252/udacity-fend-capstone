import { PixabayHit } from './pixabay-hit.model';

export interface PixabayResponse {
  totalHits: number;
  hits: PixabayHit[];
}
