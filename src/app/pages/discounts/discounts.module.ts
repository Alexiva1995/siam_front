import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscountsPage } from './discounts.page';
import { ExploreContainerComponentModule } from '../../components/explore-container/explore-container.module';
import { DiscountsPageRoutingModule } from './discounts-routing.module';
import { UIModule } from '../../ui/ui.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DiscountsPageRoutingModule,
    UIModule
  ],
  declarations: [DiscountsPage]
})
export class DiscountsPageModule { }
