import { Component, OnInit, Input } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { startWith, filter, switchMap } from 'rxjs/operators';
import { Subscription, BehaviorSubject } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Category } from '../../models/category.mode';
import { Store } from 'src/app/models/store.model';
import { DataParamsService } from 'src/app/services/data-params.service';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {

  private _direction: string;
  private _category = new BehaviorSubject<Category>(null);
  private _search: string;
  public stores: Store[];
  private subs: Subscription[] = [];
  private sub: Subscription;

  @Input('type')
  public type: string = 'slider';

  @Input('only_favs')
  public only_favs: boolean = false;

  @Input('direction')
  set direction(value: string) {
    this._direction = value;
    this.sort();
  }
  get direction(): string {
    return this._direction;
  }

  @Input('category')
  set category(value: Category) {
    this._category.next(value);
  }

  @Input('search')
  set search(value: string) {
    this._search = value;
    if (!this.stores) return;

    this.stores.forEach(store => {
      if (value) {
        if (store.name.toUpperCase().indexOf(value.toUpperCase()) !== -1) {
          store.match_search_criteria = true;
        } else {
          store.match_search_criteria = false;
        }
      } else {
        store.match_search_criteria = true;
      }
    });
    // this.sort();
  }
  get search(): string {
    return this._search;
  }

  constructor(
    private requests: RequestsService,
    private toast: ToastService,
    private loadingService: LoadingService,
    private languageService: LanguageService,
    private params: DataParamsService,
    private navController: NavController,
    private router: Router
  ) {

    // quiza no es lo más performante pero la idea funciona.
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(event => {
      this.search = '';
    });

  }

  ngOnInit() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });

    this.subs.push(this.languageService.translate.onLangChange.pipe(
      startWith(null),
      switchMap(() => this._category),
    ).subscribe(val => {
      this.loadingService.present();
      this.requests.getStores(val ? val.id : undefined).subscribe(response => {
        this.stores = response;
        this.loadingService.dismiss();
      }, error => {
        this.loadingService.dismiss();
        this.toast.present(this.languageService.translate.instant('Hubo un error cargando las tiendas'));
      });
    }));
  }

  saveFav(store: Store) {
    if (store.user_fav) {
      store.user_fav = false;
      this.requests.deleteFavoriteStore(store.id).subscribe();
    } else {
      store.user_fav = true;
      this.requests.saveFavoriteStore(store.id).subscribe();
    }
  }

  gotoDetail(store: Store) {
    this.params.data = store;
    this.navController.navigateForward("/store-detail/" + store.id);
  }

  sort() {
    if (this.stores) {
      let conditions = {
        ASC: 'a.name > b.name',
        DESC: 'a.name < b.name'
      }
      this.stores.sort((a, b) => (eval(conditions[this.direction])) ? 1 : -1);
    }
  }

}
