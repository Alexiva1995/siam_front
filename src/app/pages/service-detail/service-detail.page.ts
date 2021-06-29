import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Service } from "src/app/models/service.model";
import { LoadingService } from "src/app/services/loading.service";
import { RequestsService } from "src/app/services/requests.service";
import { ToastService } from "src/app/services/toast.service";
// ALEMAR
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {

  public service: Service;
  private service_id: number;

  constructor(
    private navController: NavController,
    private requests: RequestsService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    // ALEMAR
    // private socialSharing: SocialSharing
  ) {
    this.service_id = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.loadingService.present();
    this.requests.getService(this.service_id).subscribe(response => {
      this.service = response;
      this.loadingService.dismiss();
    }, error => {
      this.loadingService.dismiss();
      this.toast.present('Hubo un error cargando el servicio');
    });
  }

  goBack() {
    this.navController.back();
  }

  doShare() {
    // ALEMAR
    // this.socialSharing.shareWithOptions({
    //   message: this.service.title,
    //   url: this.service.share_url,
    //   // files: Array(this.event.image),
    // }).then(response => {
    // });
  }

}
