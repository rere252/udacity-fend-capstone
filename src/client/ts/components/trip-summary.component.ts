import { BaseComponent } from './base-component';
import { TripInfoResponse } from '../../../common/model/trip-info.response';

export class TripSummaryComponent extends BaseComponent {
  private readonly tripSummaryClass = 'trip-summary';
  private _tripInfo: TripInfoResponse;
  set tripInfo(info: TripInfoResponse) {
    this._tripInfo = info;
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
    fragment.appendChild(this.getTextSummary());
    this.nativeElement.innerHTML = '';
    this.nativeElement.appendChild(fragment);
    this.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  // TODO possibly avoid reflow when loading.
  private getBanner(): HTMLImageElement {
    const banner = document.createElement('img');
    banner.src = this._tripInfo.image.imageUrl;
    banner.alt = `${this._tripInfo.label}`;
    banner.className = `${this.tripSummaryClass}__banner`;
    return banner;
  }

  private getTextSummary(): HTMLElement {
    const summaryDiv = document.createElement('div');
    summaryDiv.className = `${this.tripSummaryClass}__text`;
    summaryDiv.appendChild(this.getDestinationHeading());
    summaryDiv.appendChild(this.getDepartureHeading());
    summaryDiv.appendChild(this.getWeather());
    return summaryDiv;
  }

  private getDestinationHeading(): HTMLElement {
    const heading = document.createElement('h2');
    heading.textContent = this._tripInfo.label;
    return heading;
  }

  private getDepartureHeading(): HTMLElement {
    const heading = document.createElement('h3');
    const date = new Date(this._tripInfo.departure);
    const formatted = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
    heading.textContent = `Departure: ${formatted}`;
    return heading;
  }

  private getWeather(): HTMLElement {
    const heading = document.createElement('h3');
    heading.style.marginBottom = '0.5rem';
    heading.textContent = 'Weather';
    const details = document.createElement('ul');
    details.style.margin = '0';
    const wInfo = this._tripInfo.weather;
    [wInfo.weather.description, wInfo.temp + '&#8451;'].forEach((wItem) => {
      const li = document.createElement('li');
      li.innerHTML = String(wItem);
      details.appendChild(li);
    });
    const p = document.createElement('p');
    p.appendChild(heading);
    p.appendChild(details);
    return p;
  }
}
