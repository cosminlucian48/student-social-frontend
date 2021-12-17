import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgModel} from "@angular/forms";
import {UserModel} from "../model/user.model";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  registerSubmit(ngForm: NgForm){

    if(ngForm.invalid){
      return;
    }
    const user = new UserModel(ngForm.value.email,ngForm.value.password,ngForm.value.university, ngForm.value.firstName, ngForm.value.lastName);
    this.authenticationService.register(user);

  }

}
