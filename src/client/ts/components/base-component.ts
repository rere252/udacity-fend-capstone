export abstract class BaseComponent {
  public nativeElement?: HTMLElement;
  abstract getTemplate(): string;

  constructor(public readonly id?: string) {}

  toElement(): Element {
    return this.elementFromHTML(this.getTemplate().trim());
  }

  public getChildren(): BaseComponent[] {
    return [];
  }

  public onAttached(): void {
    if (this.id) {
      this.nativeElement = document.getElementById(this.id);
    }
    this.getChildren().forEach((c) => c.onAttached());
  }

  // https://stackoverflow.com/a/35385518/3936587
  private elementFromHTML(htmlTemplate): Element {
    const templateEl = document.createElement('template');
    templateEl.innerHTML = htmlTemplate;
    //this.listenForAttachedToDOM(templateEl);
    return templateEl.content.firstElementChild;
  }
}
