import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {RequestService} from "../../services/request.service";
import {NotifierService} from "angular-notifier";
import {BlockRefreshService} from "../../services/block.refresh.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private notifier: NotifierService;

  constructor(public authenticationService: AuthenticationService, public requestService: RequestService,
              public router: Router, notifier: NotifierService, public blockRefreshService: BlockRefreshService) {
    this.notifier = notifier;
  }


  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }


  ngOnInit(): void {
  }

  logout() {
    this.blockRefreshChangeValue();
    this.authenticationService.atUserLogout();
    this.showNotification('default', 'User logged out');
    this.router.navigate(['/login']);
  }

  register() {

  }

  blockRefreshChangeValue() {
    this.blockRefreshService.setBlockRefresh(!this.blockRefreshService.getBlockRefresh());
  }

  login() {

  }


  admin() {
    this.router.navigate(["/admin"]);
  }

  home() {
    this.router.navigate([""]);
  }

  userSettings() {
    this.router.navigate(["/user-settings"]);
  }

}
