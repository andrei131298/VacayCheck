import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { City } from '../shared/city.model';
import { Property } from '../shared/property.model';
import { User } from '../shared/user.model';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgZone } from '@angular/core';
import { Country } from '../shared/country.model';
import { CityRequest } from '../shared/cityRequest.model';


@Component({
  selector: 'property-add-form',
  templateUrl: './property-add-form.component.html',
  styleUrls: ['./property-add-form.component.css']
})
export class PropertyAddFormComponent implements OnInit {
  addPropertyForm: FormGroup;
  addPropertyForm2: FormGroup;

  latitude = 44.439663;
  longitude = 26.096306;
  mainPhoto:string;
  propertyTypes=["Villa", "House", "Hotel", "Block of flats", "Motel", "Hostel"];
  cities:City[]=[];
  citySearchText:string="";
  isDivShown:boolean;
  success:boolean;
  cityId:string;
  newProperty=new Property;
  userId:string;
  activeUser:User;
  faTimes = faTimes;
  allCountries: Country[] = [];
  markerLat: number;
  markerLng: number;
  markerAlpha = 1;
  selectedCountry: string;
  allSearchedCities;
  selectedCity: string;
  errorMessage: string;
  descriptionText = "";

  map: google.maps.Map<Element>;
  mapClickListener: google.maps.MapsEventListener;

  constructor(public fb: FormBuilder, private api: ApiService, private router: Router, private zone: NgZone) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("userId");

    this.addPropertyForm = this.fb.group({
      propertyName:[null, Validators.required],
      type: [null, Validators.required],
      cityName: [null, Validators.required],
      streetName: [null, Validators.required],
      country: [null, Validators.required],
      description: [null, Validators.required],
      mainPhoto: [this.mainPhoto, Validators.required],

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
    this.api.getCountries().subscribe((countries: Country[])=>{
      this.allCountries = countries;
    });

    this.selectedCity = "";
  }

addMarker(lat: number, lng: number) {
  this.markerLat = lat;
  this.markerLng = lng;
}

public mapReadyHandler(map: google.maps.Map): void {
  this.map = map;
  this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
    this.zone.run(() => {

        this.addMarker(e.latLng.lat(), e.latLng.lng());
    });
  });
}

  deletePhoto(){
    this.mainPhoto = null;   
    this.f.mainPhoto.setValue(null);
  }
  
  onSelectCountry(countryName){
    this.selectedCountry = countryName;
    console.log(this.selectedCountry);
    this.selectedCity = "";
    this.api.getCityByCountryName(this.selectedCountry).subscribe((cities: CityRequest)=>{
      if(cities == null){
        this.allSearchedCities = []
      }
      else{
        this.allSearchedCities = cities.data;

      }
    }); 
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  this.mainPhoto = event.target.result;
                  this.f.mainPhoto.setValue(this.mainPhoto);
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
    console.log(this.mainPhoto);
    console.log(this.f.mainPhoto.value);
    if(this.markerLat && this.markerLng){
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
        this.newProperty.photo=this.mainPhoto;
        this.newProperty.cityName=this.f.cityName.value;
        this.newProperty.userId=this.userId;
        this.newProperty.mapLatitude = this.markerLat;
        this.newProperty.mapLongitude = this.markerLng;
        this.newProperty.country = this.f.country.value;
        console.log(this.newProperty);
        
        this.api.addProperty(this.newProperty).subscribe((createdProperty: Property)=>{
          if(this.activeUser.isOwner == false){
            this.activeUser.isOwner = true;
            //this.api.editUser(this.activeUser).subscribe();
            this.api.updateIsOwner(this.activeUser, this.activeUser.id).subscribe();
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
    else {
      this.errorMessage = "Please indicate the localization";
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
      this.validateAllFormFields(this.addPropertyForm);
    }

 
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
 
}
