import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { startWith } from "rxjs/operators";
import { Service } from "src/app/models/service.model";
import { User } from "src/app/models/user.model";
import { LanguageService } from "src/app/services/language.service";
import { LoadingService } from "src/app/services/loading.service";
import { LoginService } from "src/app/services/login.service";
import { RequestsService } from "src/app/services/requests.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {

  @Input('type')
  public type: string = 'slider';

  @Input('vip')
  public vip: boolean = false;

  public services: Service[];
  public user: User;
  private subs: Subscription[] = [];

  constructor(
    private requests: RequestsService,
    private toast: ToastService,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private languageService: LanguageService
  ) {
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });

    this.subs.push(this.languageService.translate.onLangChange.pipe(
      startWith(null)
    ).subscribe(() => {
      this.loadingService.present();
      this.requests.getServices(this.vip).subscribe(response => {
        this.services = [];
        response.forEach(service => {
          this.services.push(service);
        });
        this.loadingService.dismiss();
      }, error => {
        this.loadingService.dismiss();
        this.toast.present(this.languageService.translate.instant('Hubo un error cargando los servicios'));
      });
    }));
  }

}
