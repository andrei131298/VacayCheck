import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { City } from '../shared/city.model';
import { Property } from '../shared/property.model';
import { User } from '../shared/user.model';


@Component({
  selector: 'property-add-form',
  templateUrl: './property-add-form.component.html',
  styleUrls: ['./property-add-form.component.css']
})
export class PropertyAddFormComponent implements OnInit {
  addPropertyForm: FormGroup;
  addPropertyForm2: FormGroup;

  mainPhoto:string;
  propertyTypes=["Vila","House","Hotel","Flat"];
  cities:City[]=[];
  citySearchText:string="";
  isDivShown:boolean;
  success:boolean;
  cityId:string;
  newProperty=new Property;
  userId:string;
  activeUser:User;

  constructor(public fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("userId");
    this.addPropertyForm = this.fb.group({
      propertyName:[null, Validators.required],
      type: [null, Validators.required],
      city: [null, Validators.required],
      streetName: [null, Validators.required],
      streetNumber: [null, Validators.required],
      description: [null, Validators.required],

    });
    this.addPropertyForm2 = this.fb.group({
      propertyName:[null, Validators.required]

    });
    this.api.getCities().subscribe((orase:City[])=>{
      this.cities = orase;
      console.log(this.cities);
    });
    this.api.getUser(this.userId).subscribe((activeUser: User) => {
      this.activeUser=activeUser;
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  this.mainPhoto = event.target.result;
                  console.log(this.mainPhoto);
                   
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  setCity(city:City){
    this.citySearchText = city.cityName;
    this.cityId = city.id;
    console.log(this.cityId);
  }
  get f() {
    return this.addPropertyForm.controls;
  }

  isFieldValid(field: string) {
    return (
      !this.addPropertyForm.get(field).valid && this.addPropertyForm.get(field).touched
    );
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field),
    };
  }
  onSubmit() {
    if (this.addPropertyForm.valid) {
      this.success = true;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      console.log("addUserForm submitted");
      
      this.newProperty.name=this.f.propertyName.value;
      this.newProperty.type=this.f.type.value;
      this.newProperty.description=this.f.description.value;
      this.newProperty.street=this.f.streetName.value;
      this.newProperty.streetNumber=this.f.streetNumber.value;
      this.newProperty.photo=this.mainPhoto;
      this.newProperty.cityId=this.cityId;
      this.newProperty.userId=this.userId;
      console.log(this.newProperty);
      this.api.addProperty(this.newProperty).subscribe((createdProperty: Property)=>{
        if(this.activeUser.isOwner==false){
          this.activeUser.isOwner = true;
          this.api.editUser(this.activeUser).subscribe();
        }
        this.router.navigate(["/apartment-add-form",createdProperty.id]);
      });
    } else {
      this.success = false;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      this.validateAllFormFields(this.addPropertyForm);
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
