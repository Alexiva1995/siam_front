import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { plainToClass } from "class-transformer";
import { User } from "src/app/models/user.model";
import { DataParamsService } from "src/app/services/data-params.service";
import { DialogsService } from "src/app/services/dialogs.service";
import { LanguageService } from "src/app/services/language.service";
import { LoadingService } from "src/app/services/loading.service";
import { LoginService } from "src/app/services/login.service";
import { PhotoService } from "src/app/services/photo.service";
import { RequestsService } from "src/app/services/requests.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off-outline';
  public user: User;
  public birthdate: Date;

  constructor(
    private loginService: LoginService,
    private navController: NavController,
    private dialogsService: DialogsService,
    private requests: RequestsService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private params: DataParamsService,
    private photoService: PhotoService,
    private languageService: LanguageService,
  ) {
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = plainToClass(User, user);
      if (this.user) {
        this.birthdate = JSON.parse(JSON.stringify(this.user.birthdate));
      } else {
        this.birthdate = undefined;
      }
    });
  }

  ngOnInit() {
  }

  updateDate($event) {
    this.user.birthdate = $event;
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  logout() {
    this.loginService.setCurrentToken(null);
    this.loginService.setCurrentUser(null);
    this.params.data = undefined;
    this.params.discounts = undefined;
    this.params.discounts_vip = undefined;
    this.params.discounts = undefined;
    this.params.events = undefined;
    this.params.news = undefined;
    this.params.stores = undefined;

    this.navController.navigateRoot('/login');
  }

  takePhoto() {
    this.photoService.takePicture().then(image => {
      image = 'data:image/jpeg;base64,' + image;
      this.loadingService.present();
      // this.user.image = "";

      this.requests.updateUserImage(image).subscribe(response => {
        this.loadingService.dismiss();
        this.user.image = response.image;
        this.loginService.setCurrentUser(this.user);
      }, err => {
        this.loadingService.dismiss();
        this.toastService.present(this.languageService.translate.instant('Hubo un error cargando la foto'));
      });
    }).catch(err => {
      this.loadingService.dismiss();
      if (err != 'No Image Selected') {
        this.toastService.present(this.languageService.translate.instant('Hubo un error tomando la foto'));
      }
    });
  }

  saveChanges() {
    let required = {
      'email': 'Email'
    };

    for (let key in required) {
      if (!this.user[key]) {
        this.dialogsService.alert('Atención', 'Por favor completá el campo: ' + required[key]);
        return;
      }
    }
    this.loadingService.present();
    this.requests.updateUser(this.user).subscribe(response => {
      this.requests.getUser().subscribe(response => {
        this.loginService.setCurrentUser(response);
        this.loadingService.dismiss();
        this.toastService.present('Los datos se actualizaron correctamente', '', 'success');
      });
    }, error => {
      this.loadingService.dismiss();
      this.dialogsService.alert('Error', error.error.message);
    });
  }

  goBack() {
    this.navController.navigateRoot('/tabs/home');
  }

}
