import { BaseComponent } from './base-component';
import { SubmitButtonComponent } from './submit-button.component';
import { DestinationService } from '../service/destination.service';

export class DestinationFormComponent extends BaseComponent {
  private submitButton: SubmitButtonComponent;
  // TODO type
  private _onDestinationSubmitted: (resp: unknown) => void;
  private readonly loaderID = 'loader';
  private readonly loadingClass = 'loading';
  private loaderDIV: HTMLElement;
  // TODO type
  set onResponse(cb: (resp: unknown) => void) {
    this._onDestinationSubmitted = cb;
  }
  get isLoading(): boolean {
    return this.loaderDIV.classList.contains(this.loadingClass);
  }

  constructor(private destinationService: DestinationService) {
    super('destinationForm');
    this.submitButton = new SubmitButtonComponent('submitArticleButton', 'Analyze');
  }

  getChildren(): BaseComponent[] {
    return [this.submitButton];
  }

  getTemplate(): string {
    return `
      <form id="${this.id}" class="destination-form">
        <div id="${this.loaderID}"></div>
        ${this.submitButton.getTemplate()}
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
    const button = this.submitButton.nativeElement;
    button.disabled = !button.disabled;
    this.loaderDIV.classList.toggle(this.loadingClass);
  }

  private onSubmit(e: Event): void {
    e.preventDefault();
    if (this.isLoading) {
      return;
    }
    this.toggleLoading();
  }
}
