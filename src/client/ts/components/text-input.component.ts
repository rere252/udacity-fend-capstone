import { BaseComponent } from './base-component';

export class TextInputComponent extends BaseComponent {
  public nativeElement: HTMLInputElement;
  private matchPattern: string;

  constructor(
    private label: string,
    private type: string,
    private placeHolder: string,
    matchPatternRegex: RegExp,
    private patternTip: string,
    id: string
  ) {
    super(id);
    // Remove leading and trailing '/'.
    this.matchPattern = String(matchPatternRegex).slice(1, -1);
  }

  getTemplate(): string {
    return `
      <label for="${this.id}">${this.label}</label>
      <input type="${this.type}" name="${this.id}" id="${this.id}" title="${this.patternTip}"
        placeholder="${this.placeHolder}" pattern="${this.matchPattern}" required>
    `;
  }
}
