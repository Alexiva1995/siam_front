import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Event } from "src/app/models/event.model";
import { User } from "src/app/models/user.model";
import { DataParamsService } from "src/app/services/data-params.service";
import { DialogsService } from "src/app/services/dialogs.service";
import { LanguageService } from "src/app/services/language.service";
import { LoadingService } from "src/app/services/loading.service";
import { LoginService } from "src/app/services/login.service";
import { RequestsService } from "src/app/services/requests.service";
import { ToastService } from "src/app/services/toast.service";
// ALEMAR
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  public event: Event;
  private event_id: number;
  public user: User;

  constructor(
    private navController: NavController,
    private requests: RequestsService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private languageService: LanguageService,
    private loginService: LoginService,
    private params: DataParamsService,
    private dialogService: DialogsService,
    // ALEMAR
    // private socialSharing: SocialSharing
  ) {
    this.event_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.event = this.params.data;
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    if (this.params.data) return;
    this.loadingService.present();
    // ALEMAR: See why had to put response: any here (!)
    this.requests.getEvent(this.event_id).subscribe((response: any) => {
      this.event = response;
      this.loadingService.dismiss();
    }, error => {
      this.loadingService.dismiss();
      this.toast.present(this.languageService.translate.instant('Hubo un error cargando el evento'));
    });
  }

  subscribeToEvent() {
    this.dialogService.confirm(this.languageService.translate.instant('Atención'), this.languageService.translate.instant('Vas a confirmar tu asistencia a este evento ¿Estás seguro?'), this.languageService.translate.instant('Cancelar')).then(() => {
      this.loadingService.present();
      this.requests.subscribeToEvent(this.event_id).subscribe(response => {
        this.loadingService.dismiss();
        this.event.user_subscribed = true;
      });
    });
  }

  unsubscribe() {
    this.dialogService.confirm(this.languageService.translate.instant('Atención'), this.languageService.translate.instant('Vas a cancelar tu asistencia a este evento ¿Estás seguro?'), this.languageService.translate.instant('No'), this.languageService.translate.instant('Si, cancelar')).then(() => {
      this.loadingService.present();
      this.requests.unsubscribeToEvent(this.event_id).subscribe(response => {
        this.loadingService.dismiss();
        this.event.user_subscribed = false;
      });
    });
  }

  goBack() {
    this.navController.back();
  }

  doShare() {
    // ALEMAR
    // this.socialSharing.shareWithOptions({
    //   message: this.event.title,
    //   url: this.event.share_url,
    //   // files: Array(this.event.image),
    // }).then(response => {
    // });
  }

}
