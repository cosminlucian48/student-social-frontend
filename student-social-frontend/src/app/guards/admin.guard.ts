import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {RoleType} from "../enums/role.type";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
    if (this.authenticationService.isUserLoggedIn() && this.authenticationService.userHasAuthority(RoleType[RoleType.ADMIN])) {

      // this.router.navigate(['']);
      return true;
    }
    this.router.navigate([''])
    return false;
  }
}
