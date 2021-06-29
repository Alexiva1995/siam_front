import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewsDetailPageRoutingModule } from './news-detail-routing.module';
import { NewsDetailPage } from './news-detail.page';
import { UIModule } from '../../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsDetailPageRoutingModule,
    UIModule
  ],
  declarations: [NewsDetailPage]
})
export class NewsDetailPageModule { }
