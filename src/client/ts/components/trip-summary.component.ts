import { BaseComponent } from './base-component';
import { TripInfoResponse } from '../../../common/model/trip-info.response';

export class TripSummaryComponent extends BaseComponent {
  private readonly tripSummaryClass = 'trip-summary';
  private _tripInfo: TripInfoResponse;
  set tripInfo(info: TripInfoResponse) {
    this._tripInfo = info;
    console.log(info);
    this.updateDOM();
  }

  getTemplate(): string {
    return `
      <div id="${this.id}" class="${this.tripSummaryClass}">
      </div>
    `;
  }

  private updateDOM(): void {
    const fragment = new DocumentFragment();
    fragment.appendChild(this.getBanner());
    this.nativeElement.innerHTML = '';
    this.nativeElement.appendChild(fragment);
    this.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  getBanner(): HTMLImageElement {
    const banner = document.createElement('img');
    banner.src = this._tripInfo.imageUrl;
    banner.alt = `${this._tripInfo.label}`;
    banner.className = `${this.tripSummaryClass}__banner`;
    return banner;
  }
}
