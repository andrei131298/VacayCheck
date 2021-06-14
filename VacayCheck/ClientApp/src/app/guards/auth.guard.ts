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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    var userId = sessionStorage.getItem('userId');
    if(userId == null){
      this.router.navigate(["/home"]);
    }
    if(userId != route.params.id){
      console.log(userId);
      this.router.navigate(["/user-profile", userId]);
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
