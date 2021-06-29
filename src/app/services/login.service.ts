import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { AppleSignInResponse } from "@ionic-native/sign-in-with-apple/ngx";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { LanguageService } from "./language.service";
import { LoadingService } from "./loading.service";
import { RequestsService } from "./requests.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token = new BehaviorSubject<Token>(null);
  private user = new BehaviorSubject<User>(null);

  constructor(
    private storage: Storage,
    private requests: RequestsService,
    private loadingService: LoadingService,
    private languageService: LanguageService
  ) {
    this.storage.get('token').then(value => {
      this.token.next(value);
      this.requests.getUser().subscribe(response => {
        if (JSON.stringify(response) === JSON.stringify([])) {
          this.setCurrentUser(null);
          this.setCurrentToken(null);
        } else {
          this.setCurrentUser(response);
        }
      });
    });
    this.storage.get('user').then(value => {
      this.user.next(value);
    });
  }

  setCurrentToken(token) {
    this.token.next(token);
    this.storage.set('token', token);
  }

  getCurrentToken() {
    return this.token;
  }

  setCurrentUser(user) {
    this.user.next(user);
    this.storage.set('user', user);
  }

  getCurrentUser() {
    return this.user;
  }

  login(data): Promise<any> {
    this.loadingService.present();
    return new Promise((resolve, reject) => {
      this.requests.loginUser(data).subscribe(response => {
        this.setCurrentToken(response);
        this.requests.getUser().subscribe(response => {
          this.setCurrentUser(response);
          this.loadingService.dismiss();
          resolve(undefined);
        });
      }, err => {
        this.loadingService.dismiss();
        reject(this.languageService.translate.instant('Credenciales incorrectas'));
      });
    });
  }

  loginWithApple(response: AppleSignInResponse): Promise<any> {
    this.loadingService.present();
    return new Promise((resolve, reject) => {
      this.requests.loginUserWithApple(response).subscribe(res => {
        this.setCurrentToken(res);
        this.requests.getUser().subscribe(response => {
          this.setCurrentUser(response);
          this.loadingService.dismiss();
          resolve(undefined);
        }, err => {
          this.loadingService.dismiss();
          reject(this.languageService.translate.instant('Credenciales incorrectas'));
        });
      }, err => {
        this.loadingService.dismiss();
        reject(this.languageService.translate.instant('Credenciales incorrectas'));
      });
    });
  }

}
