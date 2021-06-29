import { Injectable } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toast: HTMLIonToastElement;

  constructor(
    private toastController: ToastController,
    private navController: NavController
  ) { }

  present(message, header = 'Error', color = 'danger', position: 'top' | 'bottom' | 'middle' = 'bottom', link = '', duration = 3000) {
    let buttons;
    if (duration === 0) {
      buttons = [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }

    let opts: ToastOptions = {
      message: message,
      position: position,
      color: color,
      duration: duration,
      buttons: buttons
    };

    if (header) {
      opts.header = header;
    }

    try {
      this.toast.dismiss();
    } catch (e) { }

    this.toastController.create(opts).then(obj => {
      this.toast = obj;
      obj.present();
      obj.onclick = function () {
        obj.dismiss();
      }

      this.toast.onDidDismiss().then(val => {
        if (val.role != "timeout" && val.role != 'cancel') {
          if (link) {
            this.navController.navigateRoot(link);
          }
        }
      });
    });
  }
}
