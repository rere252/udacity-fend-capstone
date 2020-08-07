import {BaseComponent} from './base-component';

export class FooterComponent extends BaseComponent {
  getTemplate() {
    return `
      <footer>
        <div>
          Udacity Front End Web Developer Nanodegree Program Project #5: FEND Capstone - Travel App
        </div>
      </footer>
    `;
  }
}
