import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServiceDetailPageRoutingModule } from './service-detail-routing.module';
import { ServiceDetailPage } from './service-detail.page';
import { UIModule } from '../../ui/ui.module';
import { AngularFittextModule } from 'angular-fittext';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ServiceDetailPageRoutingModule,
    UIModule,
    AngularFittextModule
  ],
  declarations: [ServiceDetailPage]
})
export class ServiceDetailPageModule { }
