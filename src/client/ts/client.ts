import { TripInfoService } from './service/trip-info.service';
import { Injectable } from 'injection-js';
import { TwoPanelComponent } from './components/two-panel.component';
import { DestinationFormComponent } from './components/destination-form.component';
import { TripSummaryComponent } from './components/trip-summary.component';
import { FooterComponent } from './components/footer.component';
import { TripInfoResponse } from '../../common/model/trip-info.response';

@Injectable()
export class Client {
  constructor(private tripService: TripInfoService) {}

  init(): void {
    this.initComponents();
  }

  private initComponents(): void {
    const formPanel = new DestinationFormComponent(this.tripService);
    const tripSummaryPanel = new TripSummaryComponent('tripSummaryPanel');
    formPanel.onResponse = (resp) => this.onSubmitted(tripSummaryPanel, resp);
    const twoPanel = new TwoPanelComponent('Travel App', formPanel, tripSummaryPanel);
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

  private onSubmitted(tripSummaryPanel: TripSummaryComponent, resp: TripInfoResponse) {
    tripSummaryPanel.tripInfo = resp;
  }
}
