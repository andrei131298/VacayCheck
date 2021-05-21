import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { User } from '../shared/user.model';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private route: ActivatedRoute,public fb: FormBuilder, private api: ApiService, private router: Router) { }
  userId: string;
  resetPasswordForm: FormGroup;
  user = new User();
  success: boolean;
  successMessage: string;
  faCheckCircle = faCheckCircle;


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.userId = params['id']);

    this.resetPasswordForm = this.fb.group({
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
    this.api.getUser(this.userId).subscribe((user: User)=>{
      this.user = user;
    });
  }

  isFieldValid(field: string) {
    return (
      !this.resetPasswordForm.get(field).valid && this.resetPasswordForm.get(field).touched
    );
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field),
    };
  }

  resetPassword(){
    console.log(this.resetPasswordForm.get('newPassword').value);

    if (this.resetPasswordForm.valid) {
      if(this.resetPasswordForm.get('newPassword').value == this.resetPasswordForm.get('confirmPassword').value){
        this.user.password = this.resetPasswordForm.get('newPassword').value;
        console.log(this.resetPasswordForm.get('newPassword').value);
        console.log(this.user)
        this.api.updateUserDetails(this.user, this.userId).subscribe((response)=>{
          console.log(response); 
          this.successMessage = "Your password has been updated";
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 3000);
        });
      }
    }
    else {
      this.success = false;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      this.validateAllFormFields(this.resetPasswordForm);
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
}
