import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { UIModule } from '../../ui/ui.module';
import { AngularFittextModule } from 'angular-fittext';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    UIModule,
    AngularFittextModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule { }
