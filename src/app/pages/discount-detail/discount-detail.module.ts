import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DiscountDetailPageRoutingModule } from './discount-detail-routing.module';
import { DiscountDetailPage } from './discount-detail.page';
import { UIModule } from '../../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscountDetailPageRoutingModule,
    UIModule
  ],
  declarations: [DiscountDetailPage]
})
export class DiscountDetailPageModule { }
