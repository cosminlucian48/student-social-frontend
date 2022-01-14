import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class UrlService{

  getBaseUrl():string{
    return environment.baseUrl;
  }

  getRegisterUrl():string{
    return this.getBaseUrl()+ environment.registerUrl;
  }
  getLoginUrl():string{
    return this.getBaseUrl()+ environment.loginUrl;
  }
  getUserUrl(): string{
    return this.getBaseUrl() + environment.userUrl;
  }
  getSubjectUrl():string{
    return this.getBaseUrl()+ environment.subjectUrl;
  }
  getPostUrl():string{
    return this.getBaseUrl()+ environment.postUrl;
  }
  getUserSettingsUrl():string{
    return this.getBaseUrl() + environment.userSettingsUrl;
  }
  getCommentsUrl():string{
    return this.getBaseUrl() + environment.commentUrl;
  }


  getRequestOptions() {
    return {headers: this.getScoreboardHeaders()};
  }

  getRequestOptions2() {
    return {headers: this.getScoreboardHeaders2()};
  }

  getRequestOptions3() {
    return {headers: this.getScoreboardHeaders3()};
  }

  private getScoreboardHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-type,Range,api_key,Authorization',
      'Access-Control-Expose-Headers': 'Content-Length,Content-Range',
      'Referrer-Policy': 'origin'
    });
  }

  private getScoreboardHeaders2(): HttpHeaders {
    return new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      // 'Accept': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-type,Range,api_key,Authorization',
      'Access-Control-Expose-Headers': 'Content-Length,Content-Range',
      'Referrer-Policy': 'origin'
    });
  }

  private getScoreboardHeaders3(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'blob',
      'Accept': 'blob',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-type,Range,api_key,Authorization',
      'Access-Control-Expose-Headers': 'Content-Length,Content-Range',
      'Referrer-Policy': 'origin'
    });
  }
}
