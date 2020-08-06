import { TripInfoService } from './service/trip-info.service';
import { Injectable } from 'injection-js';
import { TripSummaryComponent } from './components/trip-summary.component';
import { FooterComponent } from './components/footer.component';
import { TripInfoResponse } from '../../common/model/trip-info.response';
import { DestinationBarComponent } from './components/destination-bar.component';

@Injectable()
export class Client {
  constructor(private tripService: TripInfoService) {}

  init(): void {
    this.initComponents();
  }

  private initComponents(): void {
    const destinationBar = new DestinationBarComponent(this.tripService);
    const tripSummary = new TripSummaryComponent('tripSummaryPanel');
    destinationBar.onResponse = (resp) => this.onSubmitted(tripSummary, resp);
    const footer = new FooterComponent();
    this.attachComponents(destinationBar, tripSummary, footer);
  }

  private attachComponents(bar: DestinationBarComponent, summary: TripSummaryComponent, footer: FooterComponent): void {
    const fragment = new DocumentFragment();
    const header = document.createElement('header');
    header.appendChild(bar.toElement());
    const main = document.createElement('main');
    main.appendChild(summary.toElement());
    fragment.appendChild(header);
    fragment.appendChild(main);
    fragment.appendChild(footer.toElement());
    document.body.appendChild(fragment);
    bar.onAttached();
    summary.onAttached();
    footer.onAttached();
  }

  private onSubmitted(tripSummaryPanel: TripSummaryComponent, resp: TripInfoResponse) {
    tripSummaryPanel.tripInfo = resp;
  }
}
