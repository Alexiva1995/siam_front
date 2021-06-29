import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  private _backgroundImage: string;
  get backgroundImage(): string {
    return this._backgroundImage;
  }
  @Input('backgroundImage')
  set backgroundImage(value: string) {
    if (value && value.substring(0, 4) != 'http') {
      value = '../../assets/' + value;
    }
    this._backgroundImage = value;
  }

  private _backgroundProfileImage: string;
  get backgroundProfileImage(): string {
    return this._backgroundProfileImage;
  }

  @Input('backgroundProfileImage')
  set backgroundProfileImage(value: string) {
    if (value && value.substring(0, 4) != 'http') {
      value = '../../assets/' + value;
    }
    this._backgroundProfileImage = value;
  }

  @Output()
  onSaveFav = new EventEmitter();

  @Output()
  onShare = new EventEmitter();

  @Output()
  onIconClick = new EventEmitter();

  @Input('gallery') public gallery: string[];
  @Input('tint') public tint: string;
  @Input('share') public share: boolean = false;
  @Input('fav') public fav: boolean = false;
  @Input('favorite') public favorite: boolean = false;
  @Input('caption') public caption: {
    iconClass: string,
    color: string,
    backgroundColor: string,
    text: string
  };

  constructor() { }

  ngOnInit() { }

  saveFav(event) {
    event.stopPropagation();
    this.onSaveFav.emit();
  }

  doShare(event) {
    event.stopPropagation();
    this.onShare.emit();
  }

  iconClick() {
    this.onIconClick.emit();
  }

}
