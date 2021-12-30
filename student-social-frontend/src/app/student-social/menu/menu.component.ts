import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService,public requestService: RequestService,public router: Router, ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authenticationService.atUserLogout();
    alert("User logged out");
    this.router.navigate(['/login']);
  }
  register(){

  }
  login(){

  }

  admin(){
    this.router.navigate(["/admin"]);
  }
  home(){
    this.router.navigate([""]);
  }

}
