import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FreeBusPageRoutingModule } from './free-bus-routing.module';
import { FreeBusPage } from './free-bus.page';
import { UIModule } from '../../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreeBusPageRoutingModule,
    UIModule
  ],
  declarations: [FreeBusPage]
})
export class FreeBusPageModule { }
