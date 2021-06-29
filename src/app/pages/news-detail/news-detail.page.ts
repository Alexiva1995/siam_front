import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { News } from "src/app/models/news.model";
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
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {

  public user: User;
  public news: News;
  private news_id: number;

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
    this.news_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.news = this.params.data;
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    if (this.params.data) return;

    this.loadingService.present();
    this.requests.getNews(this.news_id).subscribe(response => {
      this.news = response;
      this.loadingService.dismiss();
    }, error => {
      this.loadingService.dismiss();
      this.toast.present(this.languageService.translate.instant('Hubo un error cargando la noticia'));
    });
  }

  goBack() {
    this.navController.back();
  }

  saveFav(news: News) {
    if (news.user_fav) {
      news.user_fav = false;
      this.requests.deleteFavoriteNews(news.id).subscribe();
    } else {
      news.user_fav = true;
      this.requests.saveFavoriteNews(news.id).subscribe();
    }
  }

  doShare() {
    // ALEMAR
    // this.socialSharing.shareWithOptions({
    //   message: this.news.title,
    //   url: this.news.share_url,
    //   // files: Array(this.event.image),
    // }).then(response => {
    // });
  }

}
