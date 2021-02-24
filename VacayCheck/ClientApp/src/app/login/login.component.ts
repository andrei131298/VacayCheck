import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { User } from "../shared/user.model";
import { ApiService } from "../../services/api.service";
import { LoginRequest } from "../shared/loginRequest";
import { RequestResponse } from "../shared/requestResponse";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  requestResponse = new RequestResponse();
  request= new LoginRequest();
  loginForm: FormGroup;
  success: boolean;
  users: User[] = [];
  triedWithoutLogin = JSON.parse(sessionStorage.getItem('triedWithoutLogin'));

  ngOnInit() {
    console.log(this.triedWithoutLogin)
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });

  }

  isFieldValid(field: string) {
    return (
      !this.loginForm.get(field).valid && this.loginForm.get(field).touched
    );
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field),
    };
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log("loginForm submitted");
      this.request.email = this.f.email.value;
      this.request.password = this.f.password.value;
      this.api.getLoginToken(this.request).subscribe((data) => {
          this.requestResponse = data.body as RequestResponse;
          console.log(this.requestResponse.token)
      }, error => {
          console.log(error);

      },

      () => {

        if (this.requestResponse.token==null){
          this.success = false;
          setTimeout(() => {
            this.success = null;
          }, 3000);
        }
        else {

          this.success = true;
          setTimeout(() => {
            this.success = null;
          }, 3000);
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("userId", JSON.stringify(this.requestResponse.id));
          this.api.getUser(this.requestResponse.id).subscribe((user: User) => {
            sessionStorage.setItem('firstName',user.firstName);
          });
          if(this.triedWithoutLogin == true){
            sessionStorage.setItem("token", this.requestResponse.token);
            this.router.navigate(["/reservation"]);
          }
          else{
            sessionStorage.setItem("token", this.requestResponse.token);
            setTimeout(() => {
              this.router.navigate(["/home"]);
            }, 3000);
          }
        }
      }
      );
    } 
    else {
      this.success = false;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      this.validateAllFormFields(this.loginForm);
    }
    

  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  reset() {
    this.loginForm.reset();
  }
}
