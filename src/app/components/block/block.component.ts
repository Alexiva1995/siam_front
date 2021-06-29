import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {

  public user: User;

  @Output()
  onSaveFav = new EventEmitter();

  @Input('short') public short: string;
  @Input('shortBackgroundColor') public shortBackgroundColor: string = '#FFFFFF';
  @Input('title') public title: string;
  @Input('caption') public caption: string;
  @Input('image') public image: string;
  @Input('tint') public tint: string;
  @Input('color') public color: string;
  @Input('type') public type: string = 'square';
  @Input('icon') public icon: string = 'square';
  @Input('lock') public lock: boolean = false;
  @Input('fav') public fav: boolean = false;
  @Input('favorite') public favorite: boolean = false;
  @Input('disabled') public disabled: boolean = false;

  constructor(
    private loginService: LoginService
  ) {
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() { }

  saveFav(event) {
    event.stopPropagation();
    this.onSaveFav.emit();
  }

}
