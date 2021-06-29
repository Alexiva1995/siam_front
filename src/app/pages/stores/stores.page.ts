import { Component, ViewChild } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { NavController, IonSelect } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Category } from '../../models/category.mode';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-stores',
  templateUrl: 'stores.page.html',
  styleUrls: ['stores.page.scss']
})
export class StoresPage {

  public inputSearch: string;
  public categories: Category[];
  public direction: string = 'ASC';
  private subs: Subscription[] = [];
  @ViewChild('categoryList', { static: false }) categoryList: IonSelect;

  public customAlertOptions: any;
  public category: Category;

  constructor(
    private navController: NavController,
    private languageService: LanguageService,
    private loadingService: LoadingService,
    private requests: RequestsService,
    private toast: ToastService,
  ) {
  }

  ngOnInit() {
    this.subs.push(this.languageService.translate.onLangChange.pipe(
      startWith(null)
    ).subscribe(() => {
      this.customAlertOptions = {
        header: this.languageService.translate.instant('Categorías')
      };
      this.requests.getCategories().subscribe(response => {
        let empty = new Category(0, this.languageService.translate.instant('VER TODAS'));
        response.unshift(empty);
        this.categories = response;
        this.setCategory();
      }, error => {
        this.loadingService.dismiss();
        this.toast.present(this.languageService.translate.instant('Hubo un error cargando las categorías'));
      });
    }));
  }

  ionViewWillEnter() {
    this.inputSearch = '';
  }

  goBack() {
    this.navController.navigateRoot('/tabs/home');
  }

  toggleOrder() {
    this.direction = this.direction == 'ASC' ? 'DESC' : 'ASC';
  }

  openCategorySelector() {
    this.categoryList.open();
  }

  setCategory() {
    this.category = this.categories.filter(category => category.id == this.categoryList.value).pop();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
