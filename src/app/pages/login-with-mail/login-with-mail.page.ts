import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { DataParamsService } from "src/app/services/data-params.service";
import { DialogsService } from "src/app/services/dialogs.service";
import { LoginService } from "src/app/services/login.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-login-with-mail',
  templateUrl: './login-with-mail.page.html',
  styleUrls: ['./login-with-mail.page.scss'],
})
export class LoginWithMailPage implements OnInit {

  public environment = environment;
  public password_recovery_link: string;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off-outline';
  public data: {
    email: string,
    password: string
  }

  constructor(
    private dialogsService: DialogsService,
    private loginService: LoginService,
    private navController: NavController,
    private params: DataParamsService,
  ) {
    this.data = {
      email: '',
      password: ''
    }

    this.password_recovery_link = this.environment.apiBaseUrl + '/password/reset';
  }

  ngOnInit() {
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  login() {
    let required = {
      'email': 'Email',
      'password': 'Password',
    };

    for (let key in required) {
      if (!this.data[key]) {
        this.dialogsService.alert('Atención', 'Por favor completá el campo: ' + required[key]);
        return;
      }
    }

    this.loginService.login(this.data).then(() => {
      this.params.data = undefined;
      this.params.discounts = undefined;
      this.params.discounts_vip = undefined;
      this.params.discounts = undefined;
      this.params.events = undefined;
      this.params.news = undefined;
      this.params.stores = undefined;
      this.navController.navigateRoot('/tabs/home');
    }).catch(message => {
      this.dialogsService.alert('Error', message);
    });

  }

}
