import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { faUserCircle, faGlobeEurope, faSignInAlt, faUserPlus, faSignOutAlt, faHome} from '@fortawesome/free-solid-svg-icons';
import { RedirectService } from "src/services/redirect.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  loggedIn = sessionStorage.getItem("isLoggedIn");
  firstName: string;
  userId:string;
  faUserCircle = faUserCircle;
  faGlobeEurope = faGlobeEurope;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faSignOutAlt= faSignOutAlt;
  faHome = faHome;

  constructor(public authService: AuthService, private router: Router, public redirect: RedirectService) {}

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.redirect.redirectTo("home");
  }


  ngOnInit() {
    this.firstName = sessionStorage.getItem("firstName");
    this.userId = sessionStorage.getItem("userId");
    console.log(this.userId)
  }
  openProfile(){
    this.router.navigate(["user-profile", this.userId]);
  }
}
