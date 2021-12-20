import {Injectable} from "@angular/core";
import jwt_decode from 'jwt-decode';
import jwtDecode from "jwt-decode";


@Injectable()
export class JWTTokenService {
  jwtToken: string | undefined;
  decodedToken: { [key: string]: string; } | undefined;

  constructor() {
  }

  getToken(){
    return this.jwtToken;
  }
  setToken(token: string | null) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodeToken() {
    return jwt_decode(<string>this.jwtToken);
  }

  getUserEmail() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.sub : null;
  }
  //
  // getEmailId() {
  //   this.decodeToken();
  //   return this.decodedToken ? this.decodedToken.email : null;
  // }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = +!this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }


}
