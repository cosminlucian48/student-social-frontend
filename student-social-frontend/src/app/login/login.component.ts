import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../model/user";
import {RequestService} from "../services/request.service";
import {JWTTokenService} from "../services/jwt.token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(public authenticationService: AuthenticationService,public requestService: RequestService,
              public router: Router) {

  }

  ngOnInit(): void {

  }



  loginSubmit(ngForm: NgForm) {
   if(ngForm.invalid){
     return
   }
    const user = new User(ngForm.value.email,ngForm.value.password,"", "", "");
    this.requestService.login(user)
      .subscribe(responseData => {
          alert("user logged in")
          const token:string | null  = responseData.headers.get("jwt-token");
          this.authenticationService.atUserLogin(token);
          this.router.navigate(['']);
        },
        error => {
          alert("not ok");
        })

  }


}
