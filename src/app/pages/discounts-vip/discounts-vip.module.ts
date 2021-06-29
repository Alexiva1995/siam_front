import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DiscountsVipPageRoutingModule } from './discounts-vip-routing.module';
import { DiscountsVipPage } from './discounts-vip.page';
import { UIModule } from '../../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscountsVipPageRoutingModule,
    UIModule
  ],
  declarations: [DiscountsVipPage]
})
export class DiscountsVipPageModule { }
