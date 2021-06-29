import { Component } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Platform, MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from './models/user.model';
import { AppService } from './services/app.service';
import { LanguageService } from './services/language.service';
import { LoginService } from './services/login.service';
import { RequestsService } from './services/requests.service';
import { ToastService } from './services/toast.service';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
// ALEMAR
// import { AppVersion } from '@ionic-native/app-version/ngx';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { FCM } from '@ionic-native/fcm/ngx';
// import {
//   Plugins,
//   PushNotification,
//   PushNotificationToken,
//   PushNotificationActionPerformed } from '@capacitor/core';
// const { PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public user: User;
  public device_type: string;
  public version: any;
  public build: any;

  constructor(
    private platform: Platform,
    // ALEMAR
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private menuController: MenuController,
    private loginService: LoginService,
    // ALEMAR
    // private fcm: FCM,
    private requestService: RequestsService,
    private navController: NavController,
    private toastService: ToastService,
    public languageService: LanguageService,
    private storage: Storage,
    private device: Device,
    private app: AppService
    // ALEMAR
    // private appVersion: AppVersion
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.languageService.language = "es";
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = user;
    });

    this.platform.ready().then(() => {
      this.storage.create().then(_ => {
        console.log(this.device.platform, this.device.version);
        if (this.device.platform == 'iOS' && Number(this.device.version) >= 13) {
          this.app.showSingApple = true;
        }

        firebase.default.initializeApp(environment.firebaseConfig);

        // ALEMAR
        // this.appVersion.getVersionCode().then(build => {
        //   this.build = build;
        // }).catch(err => {
        //   console.log(err);
        //   this.build = '0.0.0';
        // });
        // ALEMAR
        // this.appVersion.getVersionNumber().then(version => {
        //   this.version = version;
        // }).catch(err => {
        //   console.log(err)
        //   this.version = '0'
        // });

        // this.statusBar.styleDefault();
        // this.splashScreen.hide();

        if (this.platform.is('ios')) {
          this.device_type = 'ios';
        } else if (this.platform.is('android')) {
          this.device_type = 'android';
        }

        if (this.device_type == 'android') {
          // ALEMAR
          // this.fcm.getToken().then(token => {
          //   this.requestService.registerDevice(token, this.device_type).subscribe(response => {
          //     console.log("response", response);
          //   });
          // });
          // ALEMAR
          // this.fcm.onTokenRefresh().subscribe(token => {
          //   this.requestService.registerDevice(token, this.device_type).subscribe(response => {
          //     console.log("response", response);
          //   });
          // });
          // ALEMAR
          //   this.fcm.onNotification().subscribe(data => {
          //     if (data.wasTapped) {
          //       console.log("Received in background");
          //       if (data.link) {
          //         this.navController.navigateRoot(data.link);
          //       }
          //     } else {
          //       console.log("Received in foreground");
          //       this.toastService.present(
          //         data.body,
          //         data.title,
          //         'light',
          //         'top',
          //         data.link,
          //         0);
          //     };
          //     console.log(data);
          //   });
        }

        // ALEMAR
        // PushNotifications.requestPermission().then(result => {
        //   if (result.granted) {
        //     // Register with Apple / Google to receive push via APNS/FCM
        //     PushNotifications.register();

        //     PushNotifications.removeAllListeners();

        //     // On success, we should be able to receive notifications
        //     PushNotifications.addListener('registration', (token: PushNotificationToken) => {
        //       console.log('Push registration success, token: ' + token.value);
        //       this.requestService.registerDevice(token.value, this.device_type).subscribe(response => {
        //         console.log("response", response);
        //       });
        //     });

        //     // Some issue with our setup and push will not work
        //     PushNotifications.addListener('registrationError', (error: any) => {
        //       console.log('Error on registration: ' + JSON.stringify(error));
        //     });

        //     // Show us the notification payload if the app is open on our device
        //     PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
        //       // alert('Push received: ' + JSON.stringify(notification));
        //       this.toastService.present(
        //         notification.data.aps.alert.body,
        //         notification.data.aps.alert.title,
        //         'light',
        //         'top',
        //         notification.data.aps.link,
        //         0);
        //     });

        //     // Method called when tapping on a notification
        //     PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
        //       // alert('Push action performed: ' + JSON.stringify(notification));
        //       if (notification.notification.data.aps.link) {
        //         this.navController.navigateRoot(notification.notification.data.aps.link);
        //       }
        //     });
        //   } else {
        //     // Show some error
        //   }
        // }).catch(error => {

        // });

        this.loginService.getCurrentUser().subscribe(user => {
          this.user = user;
          if (this.user && this.user.language) {
            this.languageService.language = this.user.language;
          }
        });
      }, e => {
        console.error(e);
      });
    }, e => {
      console.error(e);
    });
  }

  changeLanguage(new_language: string) {
    if (new_language == this.languageService.language) return;

    if (this.user) {
      this.user.language = new_language;
      this.storage.set('user', this.user);
      this.requestService.updateUser(this.user).subscribe(response => {
      });
    }
    this.languageService.language = new_language;
  }

  close() { this.menuController.close(); }
  closeModal() { }

}
