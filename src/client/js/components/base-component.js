export class BaseComponent {
  constructor(id) {
    this.id = id;
    this.nativeElement;
  }

  getTemplate() {
    throw new TypeError('Method not implemented');
  }

  toElement() {
    return this.elementFromHTML(this.getTemplate().trim());
  }

  getChildren() {
    return [];
  }

  onAttached() {
    if (this.id) {
      this.nativeElement = document.getElementById(this.id);
    }
    this.getChildren().forEach((c) => c.onAttached());
  }

  // https://stackoverflow.com/a/35385518/3936587
  elementFromHTML(htmlTemplate) {
    const templateEl = document.createElement('template');
    templateEl.innerHTML = htmlTemplate;
    //this.listenForAttachedToDOM(templateEl);
    return templateEl.content.firstElementChild;
  }
}
