import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../model/user.model";
import {UrlService} from "./url.service";


@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private urlService: UrlService) {

  }

  register(userModel: UserModel) {
    this.httpClient.post<UserModel>(this.urlService.getRegisterUrl(), userModel, this.urlService.getRequestOptions())
      .subscribe(responseData => {
          alert("User registered succesfull]y!")
        },
        error => {
        alert("Something went wrong!")
        }
      );
  }

  login() {

  }
}
