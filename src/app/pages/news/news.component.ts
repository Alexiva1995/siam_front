import { Component, OnInit, Input } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { startWith } from "rxjs/operators";
import { News } from "src/app/models/news.model";
import { User } from "src/app/models/user.model";
import { DataParamsService } from "src/app/services/data-params.service";
import { LanguageService } from "src/app/services/language.service";
import { LoadingService } from "src/app/services/loading.service";
import { LoginService } from "src/app/services/login.service";
import { RequestsService } from "src/app/services/requests.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  public user: User;
  public news: News[];
  private subs: Subscription[] = [];

  @Input('type')
  public type: string = 'slider';

  constructor(
    private requests: RequestsService,
    private toast: ToastService,
    private loadingService: LoadingService,
    private languageService: LanguageService,
    private params: DataParamsService,
    private navController: NavController,
    private loginService: LoginService
  ) {
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.subs.push(this.languageService.translate.onLangChange.pipe(
      startWith(null)
    ).subscribe(() => {
      this.requests.getAllNews().subscribe(response => {
        if (!response) return;
        this.news = response;
      }, error => {
        this.loadingService.dismiss();
        this.toast.present(this.languageService.translate.instant('Hubo un error cargando las noticias'));
      });
    }));
  }

  saveFav(news: News) {
    if (news.user_fav) {
      news.user_fav = false;
      this.requests.deleteFavoriteNews(news.id).subscribe();
    } else {
      news.user_fav = true;
      this.requests.saveFavoriteNews(news.id).subscribe();
    }

    this.requests.news.next(this.news);
  }

  gotoDetail(news: News) {
    this.params.data = news;
    this.navController.navigateForward("/news-detail/" + news.id);
  }

}
