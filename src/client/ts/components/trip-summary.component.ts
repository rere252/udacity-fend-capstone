import { BaseComponent } from './base-component';
import { TripInfoResponse } from '../../../common/model/trip-info.response';
import { TripStorageService } from '../service/trip-storage.service';
import { daysBetween } from '../../../common/util';

export class TripSummaryComponent extends BaseComponent {
  private readonly tripSummaryClass = 'trip-summary';
  private _tripInfo: TripInfoResponse;
  set tripInfo(info: TripInfoResponse) {
    this._tripInfo = info;
    if (this._tripInfo) {
      // It's initially a date string;
      this._tripInfo.departure = new Date(this._tripInfo.departure);
      this.updateDOM();
    }
  }

  constructor(private storage: TripStorageService, id: string) {
    super(id);
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

  private getBanner(): HTMLImageElement {
    const banner = document.createElement('img');
    banner.src = this._tripInfo.image.largeImageUrl;
    banner.alt = `${this._tripInfo.label}`;
    banner.className = `${this.tripSummaryClass}__banner`;
    return banner;
  }

  private getTextSummary(): HTMLElement {
    const summaryDiv = document.createElement('div');
    summaryDiv.className = `${this.tripSummaryClass}__text`;
    summaryDiv.appendChild(this.getGeneralInfo());
    summaryDiv.appendChild(this.getWeather());
    return summaryDiv;
  }

  private getGeneralInfo() {
    const div = document.createElement('div');
    div.className = `${this.tripSummaryClass}__general`;
    div.appendChild(this.getDestinationHeading());
    div.appendChild(this.getSaveButton());
    div.appendChild(this.getDepartureHeading());
    div.appendChild(this.getDaysCountdown());
    return div;
  }

  private getDestinationHeading(): HTMLElement {
    const heading = document.createElement('h2');
    heading.textContent = this._tripInfo.label;
    return heading;
  }

  private getSaveButton(): HTMLButtonElement {
    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.textContent = 'Save';
    saveButton.onclick = () => this.storage.saveTrip(this._tripInfo);
    return saveButton;
  }

  private getDepartureHeading(): HTMLElement {
    const heading = document.createElement('h3');
    const date = this._tripInfo.departure;
    const formatted = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
    heading.textContent = `Departure: ${formatted}`;
    return heading;
  }

  private getWeather(): HTMLElement {
    const heading = document.createElement('h3');
    heading.classList.add(`${this.tripSummaryClass}__text__weather-heading`);
    heading.textContent = 'Weather';
    const details = document.createElement('ul');
    details.style.margin = '0';
    const wInfo = this._tripInfo.weather;
    const descr = wInfo.weather.description;
    const temp = `${wInfo.temp}'&#8451;`;
    const wind = `Wind speed ${Math.round(Number(wInfo.wind_spd))} m/s`;
    [descr, temp, wind].forEach((wItem) => {
      const li = document.createElement('li');
      li.innerHTML = String(wItem);
      details.appendChild(li);
    });
    const p = document.createElement('p');
    p.appendChild(heading);
    p.appendChild(details);
    return p;
  }

  private getDaysCountdown(): HTMLElement {
    const heading = document.createElement('h3');
    const daysDiff = daysBetween(new Date(), this._tripInfo.departure);
    const days = daysDiff !== 1 ? 'days' : 'day';
    heading.innerText = `${daysDiff} ${days} until departure`;
    return heading;
  }
}
