import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UIModule } from './ui/ui.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiProvider } from './services/api.provider';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TranslateModule } from '@ngx-translate/core';
import { Device } from '@ionic-native/device/ngx';
import { SignInWithApple } from '@ionic-native/sign-in-with-apple/ngx';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { Network } from '@ionic-native/network/ngx';
// ALEMAR
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { FCM } from "@ionic-native/fcm/ngx";
// import { AppVersion } from '@ionic-native/app-version/ngx';
// import { Facebook } from '@ionic-native/facebook/ngx';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
// import { firebaseConfig } from '../environments/environment';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
// import { SignInWithApple } from '@ionic-native/sign-in-with-apple/ngx';
// import { Camera } from '@ionic-native/camera/ngx';

registerLocaleData(localeEs, 'es-ES');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    UIModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    // AppVersion,
    // Facebook,
    // SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    ApiProvider,
    // ALEMAR
    Device,
    // FCM,
    // GooglePlus,
    SignInWithApple,
    // Camera
    Network
  ],
  bootstrap: [AppComponent],
  exports: [
    UIModule,
    TranslateModule
  ]
})
export class AppModule { }
