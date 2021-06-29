import { Component, Input, Renderer2, ElementRef, Inject, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { environment } from '../../../environments/environment';
import { DOCUMENT } from '@angular/common';
declare var google;

@Component({
  selector: 'google-maps',
  templateUrl: 'google-maps.component.html'
})
export class GoogleMapsComponent implements OnInit {

  private _travel: any[];

  @Input()
  public set travel(value: any[]) {
    this._travel = value;
    if (this.mapsLoaded) this.calcRoute();
  }

  public get travel(): any[] {
    return this._travel;
  }

  private apiKey = environment.GoogleApiKey;
  public map: any;
  public markers: any[] = [];
  private mapsLoaded: boolean = false;
  private networkHandler = null;
  private directionsRenderer: any;

  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    private network: NetworkService,
    @Inject(DOCUMENT) private _document
  ) {
  }

  ngOnInit() {
    this.init().then((res) => {
      console.log("Google Maps ready.");
    }, (err) => {
      console.log(err);
    });
  }

  private init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadSDK().then((res) => {
        this.initMap().then((res) => {
          resolve(true);
        }, (err) => {
          reject(err);
        });
      }, (err) => {
        reject(err);
      });
    });
  }

  private loadSDK(): Promise<any> {
    console.log("Loading Google Maps SDK");
    return new Promise((resolve, reject) => {
      if (!this.mapsLoaded) {
        if (this.network.isOnline) {
          this.injectSDK().then((res) => {
            resolve(true);
          }, (err) => {
            console.error(err);
            reject(err);
          });
        }
        else {
          reject('Not online');
          setTimeout(() => { this.init().then((res) => { }, (err) => { console.error(err); }); }, 1000);
        }
      } else {
        reject('SDK already loaded');
      }
    });
  }

  private injectSDK(): Promise<any> {
    return new Promise((resolve, reject) => {
      window['mapInit'] = () => {
        this.mapsLoaded = true;
        resolve(true);
      }
      let script = this.renderer.createElement('script');
      script.id = 'googleMaps';
      if (this.apiKey) {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&libraries=directions&callback=mapInit';
      } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?libraries=directions&callback=mapInit';
      }
      this.renderer.appendChild(this._document.body, script);
    });
  }

  private initMap(): Promise<any> {
    return new Promise((resolve, reject) => {
      let latLng = new google.maps.LatLng(28.0690743, -16.7248709);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        clickableIcons: false
      };

      this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
      // this.map.addListener('click', function(e) {
      //   console.log(e.latLng.lat(), e.latLng.lng());
      // });
      this.calcRoute();

      // TODO: Geolocation
      // Geolocation.getCurrentPosition().then((position) => {
      //     console.log(position);
      //     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //     this.addMarker(latLng, 99, false, true);
      //     // this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
      //     // resolve(true);
      // }, (err) => {
      //     console.log(err);
      //     // reject('Could not initialise map');
      // });
    });
  }

  public calcRoute() {
    if (!this.travel) return;
    var scope = this;
    var sort = 1;
    this.markers.map(market => {
      market.setMap(null);
    });

    var directionsService = new google.maps.DirectionsService;
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
    } else {
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true
      });
    }

    var origin = this.travel.shift();
    var destination = this.travel.pop();

    var waypts = [];
    this.travel.forEach(item => {
      waypts.push({
        location: item.location,
        stopover: true
      });
    });

    directionsService.route({
      origin: origin.location,
      destination: destination.location,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        scope.directionsRenderer.setDirections(response);
        scope.directionsRenderer.setMap(scope.map);

        scope.addMarker(response.request.origin.location, sort, true);
        this.travel.forEach(item => {
          if (item.label) {
            this.addMarker({
              lat: parseFloat(item.location.split(',')[0]),
              lng: parseFloat(item.location.split(',')[1])
            }, sort++);
          }
        });
        scope.addMarker(response.request.destination.location, ++sort, true);

      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }

  public addMarker(location, label: number, siamMall?: boolean, userLocation?: boolean): void {
    let markerOptions = {
      map: this.map,
      position: location,
      zIndex: label
    };
    if (siamMall) {
      markerOptions['icon'] = {
        url: '../../assets/siam-marker.svg',
        scaledSize: new google.maps.Size(45, 45)
      }
    } else if (userLocation) {
      markerOptions['icon'] = {
        url: '../../assets/icon/user-location.svg',
        scaledSize: new google.maps.Size(18, 18)
      }
    } else {
      markerOptions['label'] = {
        text: String.fromCharCode(64 + label),
        color: 'white'
      }
    }
    let marker = new google.maps.Marker(markerOptions);
    this.markers.push(marker);
  }

}