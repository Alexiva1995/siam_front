import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { startWith } from "rxjs/operators";
import { Slide } from "src/app/models/slide.model";
import { User } from "src/app/models/user.model";
import { LanguageService } from "src/app/services/language.service";
import { LoadingService } from "src/app/services/loading.service";
import { LoginService } from "src/app/services/login.service";
import { RequestsService } from "src/app/services/requests.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public user: User;
  public slides: Slide[];
  private subs: Subscription[] = [];

  constructor(
    private requests: RequestsService,
    private loadingService: LoadingService,
    private languageService: LanguageService,
    private loginService: LoginService
  ) {
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    console.log('HomePage');
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });

    this.subs.push(this.languageService.translate.onLangChange.pipe(
      startWith(null)
    ).subscribe(() => {
      this.loadingService.present();
      this.requests.getSlides().subscribe(response => {
        this.slides = response;
        this.loadingService.dismiss();
      });
    }));
  }
}
