import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  private sub: Subscription;

  constructor(
    private loginService: LoginService,
    private navController: NavController
  ) {
    this.sub = this.loginService.getCurrentUser().subscribe(user => {
      if (user) {
        this.sub.unsubscribe();
        this.navController.navigateRoot(['/tabs/home']);
      }
    });
  }

  ngOnInit() {
  }

}
