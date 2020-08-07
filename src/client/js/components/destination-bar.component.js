import {BaseComponent} from './base-component';
import {SubmitButtonComponent} from './submit-button.component';
import {TextInputComponent} from './text-input.component';

export class DestinationBarComponent extends BaseComponent {
  set onResponse(cb) {
    this._onDestinationSubmitted = cb;
  }
  get isLoading() {
    return this.loaderDIV.classList.contains(this.loadingClass);
  }

  constructor(tripService) {
    super('destinationBar');
    this.destinationField;
    this.departureDateField;
    this.tripInfoButton;
    this._onDestinationSubmitted;
    this.loaderID = 'loader';
    this.loadingClass = 'lds-hourglass';
    this.loaderDIV;

    this.tripService = tripService;

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

  getChildren() {
    return [this.destinationField, this.departureDateField, this.tripInfoButton];
  }

  getTemplate() {
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

  onAttached() {
    super.onAttached();
    this.listenFormSubmit();
    this.loaderDIV = document.getElementById(this.loaderID);
  }

  listenFormSubmit() {
    this.nativeElement.addEventListener('submit', (e) => this.onSubmit(e));
  }

  toggleLoading() {
    const button = this.tripInfoButton.nativeElement;
    button.disabled = !button.disabled;
    this.loaderDIV.classList.toggle(this.loadingClass);
  }

  onSubmit(e) {
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
