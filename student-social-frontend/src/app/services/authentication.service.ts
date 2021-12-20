import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {JWTTokenService} from "./jwt.token.service";
import {LocalStorageService} from "./local.storage.service";
import {RequestService} from "./request.service";
import jwt_decode from "jwt-decode";
import {JwtToken} from "../model/jwtToken";


@Injectable()
export class AuthenticationService {

  jwtToken: string | undefined;
  decodedToken: JwtToken | undefined;
  ZERO_MILLISECONDS = '000';

  constructor(private httpClient: HttpClient, private urlService: UrlService,
              private jwtService: JWTTokenService, public requestService: RequestService) {

  }

  register(userModel: User) {
    this.httpClient.post<User>(this.urlService.getRegisterUrl(), userModel, this.urlService.getRequestOptions())
      .subscribe(responseData => {

          alert("User registered succesfull]y!")
        },
        error => {
          alert("Something went wrong!")
        }
      );
  }

  atUserLogin(token: string | null) {
    this.jwtService.setToken(token);
    this.jwtService.decodeToken();
    // console.log(this.jwtService.getUserEmail());
    // console.log(this.jwtService.getExpiryTime());
    localStorage.setItem("jwt-token", <string>this.jwtService.getToken());
  }

  isUserLoggedIn() {
    this.loadLocalTokenFromStorage();
    if (this.jwtToken == null || this.decodedToken == null) {
      return false;
    }
    return this.checkTokenValidity();

  }

  loadLocalTokenFromStorage() {
    const token = localStorage.getItem("jwt-token");
    if (token == null) {
      return;
    }
    this.jwtToken = token;
    this.decodedToken = this.decodeToken(token);
  }

  checkTokenValidity() {
    const userEmail = this.decodedToken?.sub;
    const tokenExpirationDate = this.decodedToken?.exp;

    if (userEmail == null) {
      return false
    }
    if (tokenExpirationDate == null) {
      return false
    }
    const tokenExpirationNumber: Number = Number(tokenExpirationDate + '' + this.ZERO_MILLISECONDS)
    const currentTime: Number = Number(new Date())

    if (tokenExpirationNumber < currentTime) {
      //logout
      return false
    }
    return true;

  }


  getToken() {
    return this.jwtToken;
  }

  setToken(token: string | null) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken(token: string): JwtToken | undefined {
    if (token != null) {
      this.decodedToken = <JwtToken>jwt_decode(token);
      return this.decodedToken;

    }
    return undefined;
  }


}
