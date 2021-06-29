import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { DialogsService } from "src/app/services/dialogs.service";
import { LoadingService } from "src/app/services/loading.service";
import { RequestsService } from "src/app/services/requests.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registrationDone: boolean = false;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off-outline';
  public passwordConfirmationType: string = 'password';
  public passwordConfirmationIcon: string = 'eye-off-outline';

  public data: {
    name: string,
    last_name: string,
    email: string,
    password: string,
    password_confirmation: string
  }

  constructor(
    private navController: NavController,
    private dialogsService: DialogsService,
    private requests: RequestsService,
    private loadingService: LoadingService
  ) {
    this.data = {
      name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  ngOnInit() {
  }

  goBack() {
    this.navController.back();
  }

  hideShow(type = 'password') {
    if (type == 'password') {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
    } else if (type == 'password_confirmation') {
      this.passwordConfirmationType = this.passwordConfirmationType === 'text' ? 'password' : 'text';
      this.passwordConfirmationIcon = this.passwordConfirmationIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
    }
  }

  register() {
    let required = {
      'name': 'Nombre',
      'last_name': 'Apellido',
      'email': 'Email',
      'password': 'Password',
      'password_confirmation': 'Confirmar Password'
    };

    for (let key in required) {
      if (!this.data[key]) {
        this.dialogsService.alert('Atención', 'Por favor completá el campo: ' + required[key]);
        return;
      }
    }

    if (this.data.password != this.data.password_confirmation) {
      this.dialogsService.alert('Atención', 'Los passwords no coinciden');
      return;
    }

    delete this.data.password_confirmation;

    this.loadingService.present();
    this.requests.registerUser(this.data).subscribe(response => {
      this.registrationDone = true;
      this.loadingService.dismiss();
    }, error => {
      this.loadingService.dismiss();
      this.dialogsService.alert('Error', error.error.message);
    });
  }

}
