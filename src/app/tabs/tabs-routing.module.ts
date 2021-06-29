import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'discounts',
        loadChildren: () => import('../pages/discounts/discounts.module').then(m => m.DiscountsPageModule)
      },
      {
        path: 'stores',
        loadChildren: () => import('../pages/stores/stores.module').then(m => m.StoresPageModule)
      },
      {
        path: 'discounts-vip',
        loadChildren: () => import('../pages/discounts-vip/discounts-vip.module').then(m => m.DiscountsVipPageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('../pages/services/services.module').then(m => m.ServicesPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../pages/events/events.module').then(m => m.EventsPageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('../pages/news/news.module').then(m => m.NewsPageModule)
      },
      {
        path: 'free-bus',
        loadChildren: () => import('../pages/free-bus/free-bus.module').then(m => m.FreeBusPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
