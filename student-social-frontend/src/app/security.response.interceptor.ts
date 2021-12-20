import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlService} from "./services/url.service";
import {JWTTokenService} from "./services/jwt.token.service";

@Injectable()
export class SecurityResponseInterceptor implements HttpInterceptor {


  constructor(public urlService: UrlService, public jwtService: JWTTokenService) {
  }

  intercept(httpResponse: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //
    console.log("poate????")
    console.log(httpResponse)
    // console.log(this.jwtService.getUserEmail());
    //jwt in localstorage
    //si il pui in localstorage
    return next.handle(httpResponse);
  }



}
