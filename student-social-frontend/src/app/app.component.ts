import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'student-social-frontend';
  public loggedInUser:string | undefined | null = "";
  constructor(public authenticationService: AuthenticationService) {
  }
  ngOnInit() {
    console.log("user:",this.authenticationService.getUserEmailFromToken())
  }

  test(){
    this.loggedInUser = this.authenticationService.getUserEmailFromToken();
  }
}
