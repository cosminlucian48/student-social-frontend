import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../model/user";
import {RequestService} from "../services/request.service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";
import {NotifierService} from "angular-notifier";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  private notifier: NotifierService;
  constructor(public authenticationService: AuthenticationService,public requestService: RequestService,
              public router: Router,public dialog:MatDialog, notifier: NotifierService) {

    this.notifier = notifier;
  }


  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }


  ngOnInit(): void {
  }



  loginSubmit(ngForm: NgForm) {
   if(ngForm.invalid){
     return
   }
    const user = new User(ngForm.value.email,ngForm.value.password,"","", "", "","");
    this.requestService.login(user)
      .subscribe(responseData => {
          const token:string | null  = responseData.headers.get("jwt-token");
          this.authenticationService.atUserLogin(token);
          this.router.navigate(['']);
          this.showNotification( 'success', 'User logged in' );
        },
        error => {
          this.showNotification( 'error', 'Wrong credentials!' );
        })

  }

  registerClick() {
    const dialogRef = this.dialog.open(RegisterComponent);

  }



}
