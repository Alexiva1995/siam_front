import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginWithMailPageRoutingModule } from './login-with-mail-routing.module';
import { LoginWithMailPage } from './login-with-mail.page';
import { UIModule } from '../../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginWithMailPageRoutingModule,
    UIModule
  ],
  declarations: [LoginWithMailPage]
})
export class LoginWithMailPageModule { }
