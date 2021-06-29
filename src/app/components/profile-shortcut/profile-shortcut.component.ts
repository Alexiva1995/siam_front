import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { plainToClass } from "class-transformer";
import { User } from "src/app/models/user.model";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: 'profile-shortcut',
  templateUrl: './profile-shortcut.component.html',
  styleUrls: ['./profile-shortcut.component.scss'],
})
export class ProfileShortcutComponent implements OnInit {

  public user: User;
  public visible: boolean = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    this.loginService.getCurrentUser().subscribe(user => {
      this.user = plainToClass(User, user);
    });

    let sectionsWithoutProfileShortcut = ['/tabs/profile'];

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (sectionsWithoutProfileShortcut.indexOf(this.router.url) !== -1) {
          this.visible = false;
        } else {
          this.visible = true;
        }
      }
    });
  }

  ngOnInit() { }

}
