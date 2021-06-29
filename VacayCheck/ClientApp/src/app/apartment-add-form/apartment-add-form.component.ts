import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { Apartment } from '../shared/apartment.model';
import { Photo } from '../shared/photo.model';
import { Property } from '../shared/property.model';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'apartment-add-form',
  templateUrl: './apartment-add-form.component.html',
  styleUrls: ['./apartment-add-form.component.css']
})
export class ApartmentAddFormComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api:ApiService, public fb: FormBuilder, private router: Router) { }

  propertyId:string;
  activeProperty = new Property();
  addApartmentForm:FormGroup;
  apartmentPhotos = [];
  success:boolean;
  newApartment = new Apartment();
  newPhoto = new Photo();
  faTimes = faTimes;
  currentPhoto: string;
  errorMessage: string;
  descriptionText = "";

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.propertyId = params['propertyId']);

    this.api.getProperty(this.propertyId).subscribe((property:Property)=>{
      this.activeProperty = property;
    });

    this.addApartmentForm = this.fb.group({
      apartmentName:[null, Validators.required],
      numberOfRooms: [null, Validators.required],
      pricePerNight: [null, Validators.required],
      numberOfPersons: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  deletePhoto(photo: string){
    var index = this.apartmentPhotos.indexOf(photo);
    this.apartmentPhotos.splice(index, 1);
    
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  this.currentPhoto = event.target.result;
                  if(!this.apartmentPhotos.includes(this.currentPhoto)){
                    this.apartmentPhotos.push(this.currentPhoto);
                  }
                   
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  get f() {
    return this.addApartmentForm.controls;
  }

  isFieldValid(field: string) {
    return (
      !this.addApartmentForm.get(field).valid && this.addApartmentForm.get(field).touched
    );
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field),
    };
  }
  onSubmit() {
    if(this.apartmentPhotos.length > 0) {
      if (this.addApartmentForm.valid) {
        this.success = true;
        setTimeout(() => {
          this.success = null;
        }, 3000);

        this.newApartment.apartmentName = this.f.apartmentName.value;
        this.newApartment.numberOfRooms = this.f.numberOfRooms.value;
        this.newApartment.pricePerNight = this.f.pricePerNight.value;
        this.newApartment.maxPersons = this.f.numberOfPersons.value;
        this.newApartment.description = this.f.description.value;
        this.newApartment.propertyId = this.propertyId;
        
        this.api.addApartment(this.newApartment).subscribe((apartment: Apartment)=>{
          this.apartmentPhotos.forEach((photo) => {
            this.newPhoto.apartmentId = apartment.id;
            this.newPhoto.path = photo;
            this.api.addPhoto(this.newPhoto).subscribe(()=>{
              this.router.navigate(["my-property", this.propertyId]);
            });
          });
        });
      } 
      else {
        this.success = false;
        setTimeout(() => {
          this.success = null;
        }, 3000);
        this.validateAllFormFields(this.addApartmentForm);
      }
    }
    else {
      console.log("errrror")
      this.errorMessage = "Please select some photos";
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
      this.validateAllFormFields(this.addApartmentForm);
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
