import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { User } from "src/app/models/user.model";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: 'app-discounts',
  templateUrl: 'discounts.page.html',
  styleUrls: ['discounts.page.scss']
})
export class DiscountsPage {

  public user: User;

  constructor(
    private navController: NavController,
    private loginService: LoginService,
  ) {
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  goBack() {
    this.navController.navigateRoot('/tabs/home');
  }

}
