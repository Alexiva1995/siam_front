import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  public isOnline = false;

  constructor(private network: Network, private plt: Platform) {
    this.plt.ready().then(() => {
      this.initializeNetworkEvents();
      this.isOnline = this.network.type !== 'none';
    });
  }

  public initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => { console.log('OFFLINE'); if (this.isOnline) { this.isOnline = false; } });
    this.network.onConnect().subscribe(() => { console.log('ONLINE'); if (!this.isOnline) { this.isOnline = true; } });
  }

}
