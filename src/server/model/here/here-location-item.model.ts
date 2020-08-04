import { HereAddress } from './here-address.model';
import { Position } from '../position.model';

export interface HereLocationItem {
  title: string;
  address: HereAddress;
  position: Position;
}
