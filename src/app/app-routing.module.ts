import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AlreadyAuthGuard } from './guards/already-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'store-detail/:id',
    loadChildren: () => import('./pages/store-detail/store-detail.module').then(m => m.StoreDetailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AlreadyAuthGuard]
  },
  {
    path: 'login-with-mail',
    loadChildren: () => import('./pages/login-with-mail/login-with-mail.module').then(m => m.LoginWithMailPageModule),
    canActivate: [AlreadyAuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [AlreadyAuthGuard]
  },
  {
    path: 'discount-detail/:id',
    loadChildren: () => import('./pages/discount-detail/discount-detail.module').then(m => m.DiscountDetailPageModule)
  },
  {
    path: 'service-detail/:id',
    loadChildren: () => import('./pages/service-detail/service-detail.module').then(m => m.ServiceDetailPageModule)
  },
  {
    path: 'event-detail/:id',
    loadChildren: () => import('./pages/event-detail/event-detail.module').then(m => m.EventDetailPageModule)
  },
  {
    path: 'news-detail/:id',
    loadChildren: () => import('./pages/news-detail/news-detail.module').then(m => m.NewsDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
