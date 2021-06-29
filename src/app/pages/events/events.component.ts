import { Component, OnInit, Input } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { startWith } from "rxjs/operators";
import { Event } from "src/app/models/event.model";
import { DataParamsService } from "src/app/services/data-params.service";
import { LanguageService } from "src/app/services/language.service";
import { LoadingService } from "src/app/services/loading.service";
import { RequestsService } from "src/app/services/requests.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

  // ALEMAR: This was Event[] but it wasn't compiling? Hmm...
  public events: any[];
  private subs: Subscription[] = [];

  @Input('type')
  public type: string = 'slider';

  @Input('only_favs')
  public only_favs: boolean = false;

  constructor(
    private requests: RequestsService,
    private toast: ToastService,
    private loadingService: LoadingService,
    private languageService: LanguageService,
    private params: DataParamsService,
    private navController: NavController
  ) {
    this.events = this.params.events;
  }

  ngOnInit() {
    if (this.params.events) return;

    this.subs.forEach(sub => {
      sub.unsubscribe();
    });

    this.subs.push(this.languageService.translate.onLangChange.pipe(
      startWith(null)
    ).subscribe(() => {
      this.loadingService.present();
      this.requests.getEvents().subscribe(response => {
        this.events = response;
        this.params.events = response;
        this.loadingService.dismiss();
      }, error => {
        this.loadingService.dismiss();
        this.toast.present(this.languageService.translate.instant('Hubo un error cargando los eventos'));
      });
    }));
  }

  gotoDetail(event: Event) {
    this.params.data = event;
    this.navController.navigateForward("/event-detail/" + event.id);
  }

}
