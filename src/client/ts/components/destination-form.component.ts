import { BaseComponent } from './base-component';
import { SubmitButtonComponent } from './submit-button.component';
import { TripInfoService } from '../service/trip-info.service';
import { TripInfoResponse } from '../../../common/model/trip-info.response';
import { TextInputComponent } from './text-input.component';

export class DestinationFormComponent extends BaseComponent {
  private destinationField: TextInputComponent;
  private tripInfoButton: SubmitButtonComponent;
  private _onDestinationSubmitted: (resp: TripInfoResponse) => void;
  private readonly loaderID = 'loader';
  private readonly loadingClass = 'loading';
  private loaderDIV: HTMLElement;
  set onResponse(cb: (resp: TripInfoResponse) => void) {
    this._onDestinationSubmitted = cb;
  }
  get isLoading(): boolean {
    return this.loaderDIV.classList.contains(this.loadingClass);
  }

  constructor(private tripService: TripInfoService) {
    super('destinationForm');
    this.destinationField = new TextInputComponent(
      'Destination',
      'text',
      'Where would You like to go?',
      'destinationCityField'
    );
    this.tripInfoButton = new SubmitButtonComponent('submitArticleButton', 'Get Trip Info');
  }

  getChildren(): BaseComponent[] {
    return [this.destinationField, this.tripInfoButton];
  }

  getTemplate(): string {
    return `
      <form id="${this.id}" class="destination-form">
        ${this.destinationField.getTemplate()}
        <div id="${this.loaderID}"></div>
        ${this.tripInfoButton.getTemplate()}
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
      .postDestination(this.destinationField.nativeElement.value)
      .then((resp) => {
        console.log(resp);
      })
      .finally(() => this.toggleLoading());
  }
}
