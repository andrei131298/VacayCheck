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
import { Country } from "../shared/country.model";

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
  allCountries: Country[] = [];

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
      address: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      country: [null, Validators.required],
      cityName: [null, Validators.required]

    });

    this.api.getCountries().subscribe((countries: Country[])=>{
      this.allCountries = countries;
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
      console.log(this.addUserForm.value);
      this.api.addUser(this.addUserForm.value).subscribe((response)=>{
        if(response){
          this.router.navigate(["/email-sent"]);
        }
        else{
          this.success = false;
          setTimeout(() => {
            this.success = null;
          }, 3000);
        }
      });
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
