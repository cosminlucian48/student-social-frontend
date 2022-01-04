import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgModel} from "@angular/forms";
import {User} from "../model/user";
import {AuthenticationService} from "../services/authentication.service";
import {RequestService} from "../services/request.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private notifier: NotifierService;

  constructor(public authenticationService: AuthenticationService, public requestService: RequestService,
              public router: Router, public dialogRef: MatDialogRef<RegisterComponent>, notifier: NotifierService) {

    this.notifier = notifier;
  }



  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }


  ngOnInit(): void {
  }

  registerSubmit(ngForm: NgForm){

    if(ngForm.invalid){
      return;
    }
    const user = new User(ngForm.value.email,ngForm.value.password,ngForm.value.university, ngForm.value.firstName, ngForm.value.lastName,"",ngForm.value.faculty);
    // this.authenticationService.register(user);
    console.log(user);
    this.requestService.register(user).subscribe(responseData => {
        this.showNotification( 'success', 'User registered succesfully!' );
        this.close();
      },
      error => {
        alert("Something went wrong!")
      }
    );

  }

  close() {
    this.dialogRef.close();
  }

}
