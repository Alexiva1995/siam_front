import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewsPageRoutingModule } from './news-routing.module';
import { NewsPage } from './news.page';
import { UIModule } from '../../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    UIModule
  ],
  declarations: [NewsPage]
})
export class NewsPageModule { }
