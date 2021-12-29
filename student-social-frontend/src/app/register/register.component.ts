import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgModel} from "@angular/forms";
import {User} from "../model/user";
import {AuthenticationService} from "../services/authentication.service";
import {RequestService} from "../services/request.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService, public requestService: RequestService,
              public router: Router, public dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
  }

  registerSubmit(ngForm: NgForm){

    if(ngForm.invalid){
      return;
    }
    const user = new User(ngForm.value.email,ngForm.value.password,ngForm.value.university, ngForm.value.firstName, ngForm.value.lastName);
    // this.authenticationService.register(user);
    console.log(user);
    this.requestService.register(user).subscribe(responseData => {
        alert("User registered succesfull]y!");
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
