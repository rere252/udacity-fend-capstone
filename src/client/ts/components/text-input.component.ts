import { BaseComponent } from './base-component';

export class TextInputComponent extends BaseComponent {
  public nativeElement: HTMLInputElement;
  private matchPattern: string;

  constructor(
    private label: string,
    private type: string,
    private placeHolder: string,
    private title: string,
    id: string,
    matchPatternRegex?: RegExp
  ) {
    super(id);
    // Remove leading and trailing '/'.
    this.matchPattern = String(matchPatternRegex).slice(1, -1);
  }

  getTemplate(): string {
    return `
      <div class="text-input-container">
        <label for="${this.id}">${this.label}:</label>
        <input type="${this.type}" name="${this.id}" id="${this.id}" title="${this.title}"
          placeholder="${this.placeHolder}" ${this.getValidationAttr()} required>
      </div>
    `;
  }

  private getValidationAttr() {
    return this.matchPattern ? `match="${this.matchPattern}"` : '';
  }
}
