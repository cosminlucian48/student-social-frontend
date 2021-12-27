import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../model/user";
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Subject} from "../model/subject.model";
import {Post} from "../model/post.model";

@Injectable()
export class RequestService {

  constructor(public httpClient: HttpClient, public urlService: UrlService) {
  }

  login(userModel: User): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(this.urlService.getLoginUrl(), userModel, {observe: 'response'})
  }

  register(user: User): Observable<User>{
    return this.httpClient.post<User>(this.urlService.getRegisterUrl(), user, this.urlService.getRequestOptions());
  }

  getSubjects():Observable<Subject[]>{
    console.log(this.urlService.getSubjectUrl());
    return this.httpClient.get<Subject[]>(this.urlService.getSubjectUrl(),this.urlService.getRequestOptions());
  }

  getPosts(subjectId: number):Observable<Post[]>{

    console.log(this.urlService.getPostUrl());
    return this.httpClient.get<Post[]>(this.urlService.getPostUrl() + "/subject/" + subjectId,this.urlService.getRequestOptions());
  }

  postPost(post: Post):Observable<Post>{
    // return this.httpClient.post<User>(this.urlService.getRegisterUrl(), user, this.urlService.getRequestOptions());
    return this.httpClient.post<Post>(this.urlService.getPostUrl(),post,this.urlService.getRequestOptions());
  }

}
