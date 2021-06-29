import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Discount } from "src/app/models/discount.model";
import { User } from "src/app/models/user.model";
import { DataParamsService } from "src/app/services/data-params.service";
import { LanguageService } from "src/app/services/language.service";
import { LoadingService } from "src/app/services/loading.service";
import { LoginService } from "src/app/services/login.service";
import { RequestsService } from "src/app/services/requests.service";
import { ToastService } from "src/app/services/toast.service";
// ALEMAR
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-discount-detail',
  templateUrl: './discount-detail.page.html',
  styleUrls: ['./discount-detail.page.scss'],
})
export class DiscountDetailPage implements OnInit {

  public user: User;
  public discount: Discount;
  private discount_id: number;

  constructor(
    private navController: NavController,
    private requests: RequestsService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private languageService: LanguageService,
    private params: DataParamsService,
    private loginService: LoginService,
    // ALEMAR
    // private socialSharing: SocialSharing
  ) {
    this.discount_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.discount = this.params.data;
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    if (this.params.data) return;

    this.loadingService.present();
    this.requests.getDiscount(this.discount_id).subscribe(response => {
      this.discount = response;
      this.loadingService.dismiss();
    }, error => {
      this.loadingService.dismiss();
      this.toast.present(this.languageService.translate.instant('Hubo un error cargando la promoción'));
    });
  }

  goBack() {
    this.navController.back();
  }

  saveFav(discount: Discount) {
    if (discount.user_fav) {
      discount.user_fav = false;
      this.requests.deleteFavoriteDiscount(discount.id).subscribe();
    } else {
      discount.user_fav = true;
      this.requests.saveFavoriteDiscount(discount.id).subscribe();
    }
  }

  doShare() {
    // ALEMAR
    // this.socialSharing.shareWithOptions({
    //   message: this.discount.title,
    //   url: this.discount.share_url,
    //   // files: Array(this.event.image),
    // }).then(response => {
    // });
  }
}
