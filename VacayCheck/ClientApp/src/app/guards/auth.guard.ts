import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  Params,
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  userId = sessionStorage.getItem('userId');

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if(this.userId != route.params.id){
      this.router.navigate(["/user-profile", this.userId]);
      return false;
    }
    else{
      return true;
    }
  }
  
  verifyLogin(url): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigate(["/login"]);
      return false;
    } else if (this.isLoggedIn()) {
      return true;
    }
  }
  public isLoggedIn(): boolean {
    let status = false;
    if (sessionStorage.getItem("isLoggedIn") == "true") {
      status = true;
    } else {
      status = false;
    }
    return status;
  }
}
