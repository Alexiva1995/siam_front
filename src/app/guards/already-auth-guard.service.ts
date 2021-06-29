import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyAuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private navController: NavController
  ) { }

  canActivate(): Observable<boolean> {
    return this.loginService.getCurrentUser().pipe(
      map(user => {
        if (user) {
          this.navController.navigateRoot(['/tabs/home']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
