import { BaseComponent } from './base-component';

export class SubmitButtonComponent extends BaseComponent {
  public nativeElement: HTMLButtonElement;

  constructor(id: string, private buttonText: string) {
    super(id);
  }

  getTemplate(): string {
    return `<button id="${this.id}" class="submit-button" type="submit">${this.buttonText}</button>`;
  }
}
