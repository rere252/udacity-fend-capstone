import {BaseComponent} from './base-component';

export class TextInputComponent extends BaseComponent {

  constructor(
    label,
    type,
    placeHolder,
    title,
    id,
    matchPatternRegex
  ) {
    super(id);
    this.label = label;
    this.type = type;
    this.placeHolder = placeHolder;
    this.title = title;
    // Remove leading and trailing '/'.
    this.matchPattern = String(matchPatternRegex).slice(1, -1);
  }

  getTemplate() {
    return `
      <div class="text-input-container">
        <label for="${this.id}">${this.label}:</label>
        <input type="${this.type}" name="${this.id}" id="${this.id}" title="${this.title}"
          placeholder="${this.placeHolder}" ${this.getValidationAttr()} required>
      </div>
    `;
  }

  getValidationAttr() {
    return this.matchPattern ? `match="${this.matchPattern}"` : '';
  }
}
