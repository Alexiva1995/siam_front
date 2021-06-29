import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Store } from "src/app/models/store.model";
import { User } from "src/app/models/user.model";
import { DataParamsService } from "src/app/services/data-params.service";
import { LoadingService } from "src/app/services/loading.service";
import { LoginService } from "src/app/services/login.service";
import { RequestsService } from "src/app/services/requests.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
})
export class StoreDetailPage implements OnInit {

  public user: User;
  public store: Store;
  private store_id: number;

  constructor(
    private navController: NavController,
    private requests: RequestsService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private params: DataParamsService,
    private loginService: LoginService,
    // ALEMAR
    // private socialSharing: SocialSharing
  ) {
    this.store_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.store = this.params.data;
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    if (this.params.data) return;
    this.loadingService.present();
    this.requests.getStore(this.store_id).subscribe(response => {
      this.store = response;
      this.loadingService.dismiss();
    }, error => {
      this.loadingService.dismiss();
      this.toast.present('Hubo un error cargando la tienda');
    });
  }

  goBack() {
    this.navController.back();
  }

  saveFav(store: Store) {
    if (store.user_fav) {
      store.user_fav = false;
      this.requests.deleteFavoriteStore(store.id).subscribe();
    } else {
      store.user_fav = true;
      this.requests.saveFavoriteStore(store.id).subscribe();
    }
  }

  doShare() {
    // ALEMAR
    // this.socialSharing.shareWithOptions({
    //   message: this.store.name,
    //   url: this.store.share_url,
    //   // files: Array(this.event.image),
    // }).then(response => {
    // });
  }
}
