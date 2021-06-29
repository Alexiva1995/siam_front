import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { TranslatePipe, TranslateModule } from "@ngx-translate/core";
import { AngularFittextModule } from "angular-fittext";
import { BlockComponent } from "../components/block/block.component";
import { FullBannerComponent } from "../components/full-banner/full-banner.component";
import { GoogleMapsComponent } from "../components/google-maps/google-maps.component";
import { HeaderComponent } from "../components/header/header.component";
import { ProfileShortcutComponent } from "../components/profile-shortcut/profile-shortcut.component";
import { DiscountsComponent } from "../pages/discounts/discounts.component";
import { EventsComponent } from "../pages/events/events.component";
import { NewsComponent } from "../pages/news/news.component";
import { ServicesComponent } from "../pages/services/services.component";
import { StoresComponent } from "../pages/stores/stores.component";
import { CardFormatPipe } from "../pipes/card-format.pipe";
import { Nl2brPipe } from "../pipes/nl2br.pipe";
import { ShortDomainPipe } from "../pipes/short-domain.pipe";
import { TimetablePipe } from "../pipes/timetable.pipe";

@NgModule({
  declarations: [
    FullBannerComponent,
    BlockComponent,
    HeaderComponent,
    StoresComponent,
    DiscountsComponent,
    ServicesComponent,
    EventsComponent,
    NewsComponent,
    ProfileShortcutComponent,
    GoogleMapsComponent,
    TimetablePipe,
    ShortDomainPipe,
    CardFormatPipe,
    Nl2brPipe
  ],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    RouterModule,
    AngularFittextModule,
    TranslateModule.forRoot(),
  ],
  exports: [
    FullBannerComponent,
    BlockComponent,
    HeaderComponent,
    StoresComponent,
    DiscountsComponent,
    ServicesComponent,
    EventsComponent,
    NewsComponent,
    ProfileShortcutComponent,
    GoogleMapsComponent,
    TimetablePipe,
    ShortDomainPipe,
    CardFormatPipe,
    RouterModule,
    TranslateModule,
    TranslatePipe,
    Nl2brPipe,
    AngularFittextModule
  ]
})
export class UIModule { }
