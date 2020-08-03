import { BaseComponent } from './base-component';

export class FooterComponent extends BaseComponent {
  getTemplate(): string {
    return `
      <footer>
        <div>
          Udacity Front End Web Developer Nanodegree Program Project #4: Evaluate a news article with Natural Language Processing
        </div>
      </footer>
    `;
  }
}
