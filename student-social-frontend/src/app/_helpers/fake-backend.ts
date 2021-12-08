import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {delay, dematerialize, materialize, mergeMap} from "rxjs/operators";
import {Injectable} from "@angular/core";

let users = [{ id: 1, firstName: 'Cosmin', lastName: 'Lucian', email: 'test@test.com', password: 'test' }];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = req;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true){
        case url.endsWith('/users/authenticate') && method ==="POST":
          return authenticate();
        default:
          return next.handle(req);
      }
    }

    function authenticate(){
      const {email, password} = body;
      const user = users.find( x => x.email === email && x.password === password);
      if(!user) return error("email or password is incorrect!");
      return ok({
        id:user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token:'aproape-jwt'
      })
    }

    function ok(body: any){
      return of(new HttpResponse({status:200, body}))
    }

    function error(message: String){
      return throwError({error:{message}});
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
