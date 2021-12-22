import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlService} from "./services/url.service";
import {JWTTokenService} from "./services/jwt.token.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";

@Injectable()
export class SecurityRequestInterceptor implements HttpInterceptor {


  constructor(public urlService: UrlService, public jwtService: JWTTokenService, public router: Router,
              public authenticationService:AuthenticationService ) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(httpRequest)
    if (this.requestWithoutJWT(httpRequest)) {
      // console.log(this.jwtService.getToken())
      return next.handle(httpRequest);
    }
    // console.log("jwt: ", this.jwtService.getToken())
    httpRequest = httpRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authenticationService.getToken()}`
      }
    });

    return next.handle(httpRequest);
  }

  requestWithoutJWT(httpRequest: HttpRequest<any>) {
    if (httpRequest.url.includes(this.urlService.getRegisterUrl()) || httpRequest.url.includes(this.urlService.getLoginUrl()))
      return true;
    return false;
  }


}
