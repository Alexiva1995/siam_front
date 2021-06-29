import { Component, OnInit } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
import { Subscription } from "rxjs";
import { AppService } from "src/app/services/app.service";
import { DialogsService } from "src/app/services/dialogs.service";
import { LanguageService } from "src/app/services/language.service";
import { LoadingService } from "src/app/services/loading.service";
import { LoginService } from "src/app/services/login.service";
import { RequestsService } from "src/app/services/requests.service";
import { environment } from "src/environments/environment";
import * as firebase from 'firebase/app';
import 'firebase/auth';

// ALEMAR
// import { Facebook } from '@ionic-native/facebook/ngx';
// import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase/app';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';
import { DataParamsService } from "src/app/services/data-params.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private sub: Subscription;
  public currentPlatform: string;

  constructor(
    // ALEMAR
    // private fb: Facebook,
    private requests: RequestsService,
    private login: LoginService,
    private loadingService: LoadingService,
    private dialogsService: DialogsService,
    private languageService: LanguageService,
    private navController: NavController,
    public app: AppService,
    // ALEMAR
    // private afAuth: AngularFireAuth,
    private platform: Platform,
    // ALEMAR
    // private googlePlus: GooglePlus,
    private loginService: LoginService,
    // ALEMAR
    private params: DataParamsService,
    private signInWithApple: SignInWithApple
  ) {
    this.sub = this.loginService.getCurrentUser().subscribe(user => {
      if (user) {
        this.sub.unsubscribe();
        this.navController.navigateRoot(['/tabs/home']);
      }
    });
  }

  ngOnInit() {
    if (this.platform.is('android')) {
      this.currentPlatform = 'android';
    } else if (this.platform.is('ios')) {
      this.currentPlatform = 'ios';
    }
  }

  async doFbLogin() {
    //the permissions your facebook app needs from the user
    // const permissions = ["public_profile", "email"];
    // ALEMAR
    // this.fb.login(permissions).then(response => {
    //   this.loadingService.present();
    //   let accessToken = response.authResponse.accessToken;
    //   this.requests.loginUserWithFacebook(accessToken).subscribe(response => {
    //     this.login.setCurrentToken(response);
    //     this.requests.getUser().subscribe(response => {
    //       this.login.setCurrentUser(response);
    //       this.loadingService.dismiss();
    //       this.navController.navigateRoot('/tabs/home');
    //     });
    //   }, err => {
    //     this.loadingService.dismiss();
    //     this.dialogsService.alert('Error', this.languageService.translate.instant('Credenciales incorrectas'));
    //   });
    // }, error => {
    //   console.log(error);
    // });
  }

  doGoogleLogin() {
    if (this.platform.is('android')) {
      this.loginGoogleMobile(environment.WebOAuthClientId);
    } else if (this.platform.is('ios')) {
      this.loginGoogleMobile(environment.iOSOAuthClientId);
    } else {
      this.loginGoogleWeb();
    }
  }

  showSingApple: boolean = false;
  doAppleLogin() {
    console.log('signing in...');
    this.signInWithApple.signin({
      requestedScopes: [
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
      ]
    }).then(async (succ: AppleSignInResponse) => {
      console.log(succ);
      console.log(JSON.stringify(succ));
      this.loginService.loginWithApple(succ).then(x => {
        this.params.discounts = undefined;
        this.params.discounts_vip = undefined;
        this.params.discounts = undefined;
        this.params.events = undefined;
        this.params.news = undefined;
        this.params.stores = undefined;
        this.navController.navigateRoot('/tabs/home');
      }, e => {
        this.dialogsService.alert('Error', e);
      });
    }, (err: AppleSignInErrorResponse) => {
      if (err.code != 1000) {
        this.dialogsService.alert('Error', err.localizedDescription);
      } else {
        console.error(err);
      }
    });
  }

  async loginGoogleMobile(webClientId) {
    // ALEMAR
    // console.log(webClientId);
    // const res = await this.googlePlus.login({
    //   'webClientId': webClientId,
    //   'offline': true
    // });
    // // console.log(res);
    // this.loadingService.present();
    // this.requests.loginUserWithGoogle(res.accessToken).subscribe(response => {
    //   this.login.setCurrentToken(response);
    //   this.requests.getUser().subscribe(response => {
    //     this.login.setCurrentUser(response);
    //     this.loadingService.dismiss();
    //     this.navController.navigateRoot('/tabs/home');
    //   });
    // });
  }

  async loginGoogleWeb() {
    // ALEMAR
    // const res = await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // this.requests.loginUserWithGoogle(res.credential['accessToken']).subscribe(response => {
    //   this.login.setCurrentToken(response);
    //   this.requests.getUser().subscribe(response => {
    //     this.login.setCurrentUser(response);
    //     this.loadingService.dismiss();
    //     this.navController.navigateRoot('/tabs/home');
    //   });
    // });
  }
}
