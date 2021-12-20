import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgModel} from "@angular/forms";
import {User} from "../model/user";
import {AuthenticationService} from "../services/authentication.service";
import {RequestService} from "../services/request.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService, public requestService: RequestService) { }

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
        alert("User registered succesfull]y!")
      },
      error => {
        alert("Something went wrong!")
      }
    );

  }

}
