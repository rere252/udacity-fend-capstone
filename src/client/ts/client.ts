import { DestinationService } from './service/destination.service';
import { Injectable } from 'injection-js';
import { TwoPanelComponent } from './components/two-panel.component';
import { DestinationFormComponent } from './components/destination-form.component';
import { TripSummaryComponent } from './components/trip-summary.component';
import { FooterComponent } from './components/footer.component';

@Injectable()
export class Client {
  constructor(private destinationService: DestinationService) {}

  init(): void {
    this.initComponents();
  }

  private initComponents(): void {
    const formPanel = new DestinationFormComponent(this.destinationService);
    const tripSummaryPanel = new TripSummaryComponent();
    const twoPanel = new TwoPanelComponent('Travel App', formPanel, tripSummaryPanel);
    formPanel.onResponse = (resp) => this.onAnalyzed(twoPanel, resp);
    const footer = new FooterComponent();
    this.attachComponents(twoPanel, footer);
  }

  private attachComponents(twoPanel: TwoPanelComponent, footer: FooterComponent): void {
    const fragment = new DocumentFragment();
    const main = document.createElement('main');
    main.appendChild(twoPanel.toElement());
    fragment.appendChild(main);
    fragment.appendChild(footer.toElement());
    document.body.appendChild(fragment);
    twoPanel.onAttached();
    footer.onAttached();
  }

  // TODO type fixes
  private onAnalyzed(twoPanel: TwoPanelComponent, resp: unknown) {
    twoPanel.updateRightPanel(new TripSummaryComponent(resp as string));
    twoPanel.leftPanel.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
