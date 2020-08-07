import {BaseComponent} from './base-component';

export class SubmitButtonComponent extends BaseComponent {
  constructor(id, buttonText) {
    super(id);
    this.buttonText = buttonText;
  }

  getTemplate() {
    return `<button id="${this.id}" class="submit-button flex-end" type="submit">${this.buttonText}</button>`;
  }
}
