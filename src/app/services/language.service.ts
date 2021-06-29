import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import messages_es from "../../assets/i18n/es.json";
import messages_en from "../../assets/i18n/en.json";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _language: string;

  get language(): string {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
    this.translate.use(value);
    this.storage.set('language', value);
  }

  constructor(
    private storage: Storage,
    public translate: TranslateService
  ) {
    this.translate.setTranslation('es', messages_es);
    this.translate.setTranslation('en', messages_en);
    this.translate.setDefaultLang('es');

    this.storage.create().then(() => {
      this.storage.get('language').then(value => {
        if (value) {
          this.language = value;
        }
      });
    });
  }
}
