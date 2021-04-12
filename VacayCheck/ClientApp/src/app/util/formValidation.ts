import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class FormValidation {
  constructor() {}

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
  isFieldValid(field: string, formGroup: FormGroup) {
    return (
      !formGroup.get(field).valid && formGroup.get(field).touched
    );
  }

  displayFieldCss(field: string, formGroup: FormGroup) {
    return {
      "has-error": this.isFieldValid(field, formGroup),
      "has-feedback": this.isFieldValid(field ,formGroup),
    };
  }
 
}
