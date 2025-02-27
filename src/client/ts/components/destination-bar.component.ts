import { BaseComponent } from './base-component';
import { SubmitButtonComponent } from './submit-button.component';
import { TripInfoService } from '../service/trip-info.service';
import { TripInfoResponse } from '../../../common/model/trip-info.response';
import { TextInputComponent } from './text-input.component';

export class DestinationBarComponent extends BaseComponent {
  private destinationField: TextInputComponent;
  private departureDateField: TextInputComponent;
  private tripInfoButton: SubmitButtonComponent;
  private _onDestinationSubmitted: (resp: TripInfoResponse) => void;
  private readonly loaderID = 'loader';
  private readonly loadingClass = 'lds-hourglass';
  private loaderDIV: HTMLElement;
  set onResponse(cb: (resp: TripInfoResponse) => void) {
    this._onDestinationSubmitted = cb;
  }
  get isLoading(): boolean {
    return this.loaderDIV.classList.contains(this.loadingClass);
  }

  constructor(private tripService: TripInfoService) {
    super('destinationBar');
    this.destinationField = new TextInputComponent(
      'Destination',
      'text',
      'Where to?',
      'Destination',
      'destinationCityField'
    );
    this.departureDateField = new TextInputComponent(
      'Departure Date',
      'date',
      null,
      'Departure',
      'destinationDateField'
    );
    this.tripInfoButton = new SubmitButtonComponent('submitArticleButton', 'Get Trip Info');
  }

  getChildren(): BaseComponent[] {
    return [this.destinationField, this.departureDateField, this.tripInfoButton];
  }

  getTemplate(): string {
    return `
      <form id="${this.id}" class="destination-bar">
        <div class="destination-bar__fields">
          ${this.destinationField.getTemplate()}
          ${this.departureDateField.getTemplate()}
        </div>
        <div class="destination-bar__submit">
          ${this.tripInfoButton.getTemplate()}
          <div class="loader" id="${this.loaderID}"></div>
        </div>
      </form>
    `;
  }

  onAttached(): void {
    super.onAttached();
    this.listenFormSubmit();
    this.loaderDIV = document.getElementById(this.loaderID);
  }

  private listenFormSubmit(): void {
    this.nativeElement.addEventListener('submit', (e) => this.onSubmit(e));
  }

  private toggleLoading() {
    const button = this.tripInfoButton.nativeElement;
    button.disabled = !button.disabled;
    this.loaderDIV.classList.toggle(this.loadingClass);
  }

  private onSubmit(e: Event): void {
    e.preventDefault();
    if (this.isLoading) {
      return;
    }
    this.toggleLoading();
    this.tripService
      .postDestination(this.destinationField.nativeElement.value, this.departureDateField.nativeElement.valueAsDate)
      .then((resp) => this._onDestinationSubmitted(resp))
      .finally(() => this.toggleLoading());
  }
}
