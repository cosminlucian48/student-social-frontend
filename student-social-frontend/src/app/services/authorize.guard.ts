import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {LocalStorageService} from "./local.storage.service";
import {JWTTokenService} from "./jwt.token.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private authStorageService: LocalStorageService,
              private jwtService: JWTTokenService,
              private router:Router ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
    if(this.authenticationService.isUserLoggedIn()){
      // this.router.navigate(['']);
      return true;
    }
    this.router.navigate(['/login'])
    return false;

  }
}
