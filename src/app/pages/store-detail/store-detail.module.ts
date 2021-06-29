import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreDetailPageRoutingModule } from './store-detail-routing.module';

import { StoreDetailPage } from './store-detail.page';
import { UIModule } from '../../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreDetailPageRoutingModule,
    UIModule
  ],
  declarations: [StoreDetailPage]
})
export class StoreDetailPageModule { }
