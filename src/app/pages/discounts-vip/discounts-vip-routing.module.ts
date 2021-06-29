import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscountsVipPage } from './discounts-vip.page';

const routes: Routes = [
  {
    path: '',
    component: DiscountsVipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountsVipPageRoutingModule { }
