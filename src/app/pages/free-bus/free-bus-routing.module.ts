import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreeBusPage } from './free-bus.page';

const routes: Routes = [
  {
    path: '',
    component: FreeBusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeBusPageRoutingModule { }
