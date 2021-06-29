import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { LanguageService } from './language.service';
// ALEMAR
// import { Plugins, CameraResultType, CameraPhoto, CameraSource } from '@capacitor/core';
// import fixOrientation from 'fix-orientation-capacitor';
// const { Camera } = Plugins;
// import { Camera } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    // private camera: Camera,
    private actionSheetController: ActionSheetController,
    private languageService: LanguageService
  ) { }

  async takePicture(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.actionSheetController.create({
        header: this.languageService.translate.instant('Nueva Foto'),
        buttons: [{
          text: this.languageService.translate.instant('Cámara'),
          handler: () => {
            this.getPicture('camera').then(image => {
              resolve(image);
            });
          }
        }, {
          text: this.languageService.translate.instant('Galería'),
          handler: () => {
            this.getPicture('photolibrary').then(image => {
              resolve(image);
            });
          }
        }]
      }).then(actionSheet => {
        actionSheet.present();
      });
    });
  }

  getPicture(sourceType): Promise<string> {
    return new Promise((resolve, reject) => {
      // TODO: FIX CAMERA
      // this.camera.getPicture({
      //   quality: 80,
      //   destinationType: this.camera.DestinationType.DATA_URL,
      //   encodingType: this.camera.EncodingType.JPEG,
      //   mediaType: this.camera.MediaType.PICTURE,
      //   correctOrientation: true,
      //   sourceType: sourceType == 'camera' ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY
      // }).then(image => {
      //   resolve(image);
      // });
    });
  }
}
