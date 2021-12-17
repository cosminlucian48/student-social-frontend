import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlService} from "./services/url.service";

@Injectable()
export class SecurityRequestInterceptor implements HttpInterceptor {


  constructor(public urlService: UrlService) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //
    if (this.requestWithoutJWT(httpRequest)){
      return next.handle(httpRequest);
    }
    //jwt in localstorage
    //si il pui in localstorage
      return next.handle(httpRequest);
  }

  requestWithoutJWT(httpRequest: HttpRequest<any>) {
    return httpRequest.url.includes(this.urlService.getRegisterUrl())
  }

}
