import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../model/user";
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class RequestService {

  constructor(public httpClient: HttpClient, public urlService: UrlService) {
  }

  login(userModel: User): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(this.urlService.getLoginUrl(), userModel, {observe: 'response'})
  }

}
