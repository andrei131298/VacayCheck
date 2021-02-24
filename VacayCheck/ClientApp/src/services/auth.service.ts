import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  logout(): void {
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.removeItem("token");
  }
}
