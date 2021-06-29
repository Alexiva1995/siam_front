import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginWithMailPage } from './login-with-mail.page';

const routes: Routes = [
  {
    path: '',
    component: LoginWithMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginWithMailPageRoutingModule { }
