import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'full-banner',
  templateUrl: './full-banner.component.html',
  styleUrls: ['./full-banner.component.scss'],
})
export class FullBannerComponent implements OnInit {

  private _image: string;
  get image(): string {
    return this._image;
  }
  @Input('image')
  set image(value: string) {
    if (value && value.substring(0, 4) != 'http') {
      value = '../../assets/' + value;
    }
    this._image = value;
  }

  @Input('short') public short: string;
  @Input('title') public title: string;
  @Input('caption') public caption: string;
  @Input('link') public link: string;
  @Input('type') public type: string = 'home';

  constructor() { }

  ngOnInit() { }

}
