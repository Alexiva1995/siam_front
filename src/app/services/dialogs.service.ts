import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(
    private alertController: AlertController,
  ) { }

  confirm(
    header: string = '¿Estás seguro?',
    question: string = '',
    cancel_text: string = 'Cancelar',
    ok_text: string = 'OK'
  ): Promise<any> {

    return new Promise((resolve, reject) => this.alertController.create({
      header: header,
      message: question,
      buttons: [
        {
          text: cancel_text,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            reject();
          }
        }, {
          text: ok_text,
          handler: () => {
            resolve(undefined);
          }
        }
      ]
    }).then(alert => {
      alert.present();
    }));
  }

  alert(header: string = 'Atención', message: string = '', ok_text: string = 'OK') {
    this.alertController.create({
      header: header,
      message: message,
      buttons: [ok_text]
    }).then(alert => {
      alert.present();
    });
  }

  input(
    header: string = '',
    placeholder: string = '',
    cancel_text: string = 'Cancelar',
    ok_text: string = 'Guardar',
    default_value: string = '',
    input_type: "number" | "text" | "date" | "email" | "password" | "search" | "tel" | "url" | "time" | "checkbox" | "radio" = "text"
  ): Promise<any> {

    return new Promise((resolve, reject) => this.alertController.create({
      header: header,
      inputs: [
        {
          name: 'input',
          type: input_type,
          value: default_value,
          placeholder: placeholder
        }
      ],
      buttons: [
        {
          text: cancel_text,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            reject()
          }
        }, {
          text: ok_text,
          handler: (data) => {
            resolve(data);
          }
        }
      ]
    }).then(alert => {
      alert.present();
    }));
  }
}
