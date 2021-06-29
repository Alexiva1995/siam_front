import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { User } from "src/app/models/user.model";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  public user: User;

  constructor(
    private navController: NavController,
    private loginService: LoginService,
  ) {
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.navController.navigateRoot('/tabs/home');
  }

}
