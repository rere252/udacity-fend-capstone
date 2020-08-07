import {Inject} from 'injection-js';
import {DestinationBarComponent} from './components/destination-bar.component';
import {FooterComponent} from './components/footer.component';
import {TripSummaryComponent} from './components/trip-summary.component';
import {TripInfoService} from './service/trip-info.service';
import {TripStorageService} from './service/trip-storage.service';

export class Client {
  static get parameters() {
    return [new Inject(TripInfoService), new Inject(TripStorageService)];
  }

  constructor(tripService, storage) {
    this.tripService = tripService;
    this.storage = storage;
  }

  init() {
    this.initComponents();
  }

  initComponents() {
    const destinationBar = new DestinationBarComponent(this.tripService);
    const tripSummary = new TripSummaryComponent(this.storage, 'tripSummary');
    destinationBar.onResponse = (resp) => this.onSubmitted(tripSummary, resp);
    const footer = new FooterComponent();
    this.attachComponents(destinationBar, tripSummary, footer);
    this.onSubmitted(tripSummary, this.storage.getLastSavedTrip());
  }

  attachComponents(bar, summary, footer) {
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

  onSubmitted(tripSummaryPanel, resp) {
    tripSummaryPanel.tripInfo = resp;
  }
}
