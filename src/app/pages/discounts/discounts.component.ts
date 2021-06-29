import { Component, OnInit, Input } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { startWith } from "rxjs/operators";
import { Discount } from "src/app/models/discount.model";
import { User } from "src/app/models/user.model";
import { DataParamsService } from "src/app/services/data-params.service";
import { LanguageService } from "src/app/services/language.service";
import { LoadingService } from "src/app/services/loading.service";
import { LoginService } from "src/app/services/login.service";
import { RequestsService } from "src/app/services/requests.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
})
export class DiscountsComponent implements OnInit {

  public discounts: Discount[];
  public has_vip: boolean;
  public has_normal: boolean;

  public user: User;
  private subs: Subscription[] = [];

  @Input('vip')
  public vip: boolean = false;

  @Input('type')
  public type: string = 'slider';

  @Input('only_favs')
  public only_favs: boolean = false;

  constructor(
    private requests: RequestsService,
    private toast: ToastService,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private languageService: LanguageService,
    private params: DataParamsService,
    private navController: NavController
  ) {
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.subs.push(this.languageService.translate.onLangChange.pipe(
      startWith(null)
    ).subscribe(() => {
      this.requests.getDiscounts().subscribe(response => {
        if (!response) return;
        this.discounts = response;
        for (let i = 0; i < this.discounts.length; i++) {
          if (this.discounts[i].vip) {
            this.has_vip = true;
          } else {
            this.has_vip = true;
          }

          if (this.has_vip && this.has_normal) break;
        }
      }, error => {
        this.loadingService.dismiss();
        this.toast.present(this.languageService.translate.instant('Hubo un error cargando las promociones'));
      });
    }));
  }

  saveFav(discount: Discount) {
    if (discount.user_fav) {
      discount.user_fav = false;
      this.requests.deleteFavoriteDiscount(discount.id).subscribe();
    } else {
      discount.user_fav = true;
      this.requests.saveFavoriteDiscount(discount.id).subscribe();
    }

    this.requests.discounts.next(this.discounts);
  }

  gotoDetail(discount: Discount) {
    if (discount.vip && !this.user) return;
    this.params.data = discount;
    this.navController.navigateForward("/discount-detail/" + discount.id);
  }

  comingSoon() {
    this.toast.present('Sección aún no disponible', '¡Proximamente!', 'secondary');
  }

}
