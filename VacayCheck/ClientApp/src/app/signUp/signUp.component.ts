import { Component, OnInit } from "@angular/core";
import { User } from "../shared/user.model";
import { Router } from "@angular/router";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "sign-up",
  templateUrl: "./signUp.component.html",
  styleUrls: ["./signUp.component.css"],
})
export class SignUpComponent implements OnInit {
  selectedOption = "User";
  addUserForm: FormGroup;
  success: boolean;
  birthDate: string;
  returnUrl = "/home";

  constructor(
    public fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addUserForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      birthDate: [null, Validators.required],
      sex: [null, Validators.required],
    });
  }

  get f() {
    return this.addUserForm.controls;
  }

  isFieldValid(field: string) {
    return (
      !this.addUserForm.get(field).valid && this.addUserForm.get(field).touched
    );
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field),
    };
  }
  onSubmit() {
    if (this.addUserForm.valid) {
      this.success = true;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      console.log("addUserForm submitted");
      this.api.addUser(this.addUserForm.value).subscribe();
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("firstName", this.f.firstName.value);
      this.router.navigate([this.returnUrl]);
    } else {
      this.success = false;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      this.validateAllFormFields(this.addUserForm);
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
    this.addUserForm.reset();
  }
}
