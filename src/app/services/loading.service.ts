import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading: boolean = false;

  constructor(
    public loadingController: LoadingController,
    private languageService: LanguageService
  ) { }

  async present() {
    if (this.isLoading) return;

    this.isLoading = true;
    return await this.loadingController.create({
      message: this.languageService.translate.instant('Procesando')
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss().catch(err => { });
    }
  }
}
