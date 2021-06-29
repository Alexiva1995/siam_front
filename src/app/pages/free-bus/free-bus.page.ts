import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { LanguageService } from "src/app/services/language.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'app-free-bus',
  templateUrl: './free-bus.page.html',
  styleUrls: ['./free-bus.page.scss'],
})
export class FreeBusPage implements OnInit {

  public travel: any[];
  public routes: any[];
  public selectedRoute: number = 0;

  constructor(
    private languageService: LanguageService,
    private navController: NavController,
    private toastService: ToastService
  ) {
    this.routes = [
      {
        title: this.languageService.translate.instant('Ruta 1 - Costa Adeje'),
        schedule: this.languageService.translate.instant('TODOS LOS DIAS - SALIDAS<br>10:00 / 11:00 / 12:00 / 13:00'),
        points: [
          {
            location: '28.0692673,-16.7225947'
          },
          {
            label: '(A) C.C. El Duque Shops',
            location: '28.092616699999997,-16.7366454'
          },
          {
            label: '(B) C.C. Fañabé Plaza',
            location: '28.086692199999998,-16.7325864'
          },
          {
            label: '(C) Hotel Ocean Park',
            location: '28.0811685,-16.7299884'
          },
          {
            label: '(D) Hotel Boungaville Playa',
            location: '28.0753196,-16.7316045'
          },
          {
            label: '(E) Siam Mall',
            location: '28.0692673,-16.7225947'
          }
        ]
      },
      {
        title: this.languageService.translate.instant('Ruta 2 - Los Cristianos / Playa De Las Américas'),
        schedule: this.languageService.translate.instant('TODOS LOS DIAS - SALIDAS<br>10:20 / 11:00 / 12:00 / 13:00'),
        points: [
          {
            location: '28.0692673,-16.7225947'
          },
          {
            label: '(A) C.C. Pasarela',
            location: '28.053977099999997,-16.7068384'
          },
          {
            label: '(B) Hotel Sol Arona',
            location: '28.0508845,-16.7130713'
          },
          {
            label: '(C) Hotel Best Tenerife',
            location: '28.057181,-16.731657'
          },
          {
            label: '(D) C.C. Presidente',
            location: '28.0634299,-16.7307399'
          },
          {
            label: '(E) Hotel Olé Tropical',
            location: '28.0661198,-16.7265665'
          },
          {
            label: '(F) Siam Mall',
            location: '28.0692673,-16.7225947'
          }
        ]
      },
      {
        title: this.languageService.translate.instant('Ruta 3 - Callao Salvaje / Playa Paraíso'),
        schedule: this.languageService.translate.instant('TODOS LOS JUEVES - SALIDA 10:00'),
        points: [
          {
            label: '(A) Playa Paraíso - Bahía Príncipe (Parada TITSA)',
            location: '28.1296957,-16.781112099999998'
          },
          {
            label: '(B) Boca Nivaria (Parada TITSA)',
            location: '28.1213199,-16.7761059'
          },
          {
            label: '(C) Callao Salvaje (Parada TITSA)',
            location: '28.121001,-16.767466799999998'
          },
          {
            label: '(D) Siam Mall',
            location: '28.0692673,-16.7225947'
          }
        ]
      },
      {
        title: this.languageService.translate.instant('Ruta 4 - Golf del Sur'),
        schedule: this.languageService.translate.instant('TODOS LOS JUEVES - SALIDA 10:00'),
        points: [
          {
            label: '(A) Sand Club (Parada TITSA 7289)',
            location: '28.0274,-16.6104'
          },
          {
            label: '(B) Pueblo Primavera (Parada TITSA 7283)',
            location: '28.025599999999997,-16.6084'
          },
          {
            label: '(C) Hotel Golf Plaza (Parada TITSA 7282)',
            location: '28.0288795,-16.6038061'
          },
          {
            label: '(D) Siam Mall',
            location: '28.0692673,-16.7225947'
          }
        ]
      }
    ];
  }

  ngOnInit() { this.selectRoute(0); }
  ionViewDidEnter() { }

  selectRoute(routeIndex: number) {
    this.selectedRoute = routeIndex;

    if (this.routes[this.selectedRoute] && this.routes[this.selectedRoute].points) {
      this.travel = JSON.parse(JSON.stringify(this.routes[this.selectedRoute].points));
    }
  }

  goBack() {
    this.navController.navigateRoot('/tabs/home');
  }

}
