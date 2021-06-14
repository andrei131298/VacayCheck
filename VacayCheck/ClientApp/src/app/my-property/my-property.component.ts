import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Apartment } from '../shared/apartment.model';
import { Property } from '../shared/property.model';
import { LoaderComponent } from '../loader/loader.component';
import { faUser,faBuilding, faStar, faPen, faPlus, faMapMarkerAlt, faTimes, faList } from '@fortawesome/free-solid-svg-icons';
import { ApartmentProfileComponent } from '../apartment-profile/apartment-profile.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../shared/country.model';
import { CityRequest } from '../shared/cityRequest.model';

@Component({
  selector: 'my-property',
  templateUrl: './my-property.component.html',
  styleUrls: ['./my-property.component.css']
})
export class MyPropertyComponent implements OnInit {

  @ViewChild("loader") detailModal: LoaderComponent;

  constructor(private api: ApiService, private router: Router,private route: ActivatedRoute, private fb: FormBuilder) {
  }

  latitude = 44.439663;
  longitude = 26.096306;
  editPropertyForm: FormGroup;
  propertyId:string;
  loggedIn = sessionStorage.getItem("isLoggedIn");
  properties:Property[]=[];
  apartments: Apartment[] = [];
  allCountries: Country[] = [];
  property:Property;
  isLoaded = false;
  isFollow: boolean = false;
  edit = false;
  success: boolean;
  modalOpened = false;
  userId = sessionStorage.getItem('userId');
  faUser = faUser;
  faBuilding = faBuilding;
  faStar = faStar;
  faPen = faPen;
  faPlus = faPlus;
  faTimes = faTimes;
  faMapMarkerAlt = faMapMarkerAlt;
  faList = faList;
  propertyTypes=["Vila","House","Hotel","Flat"];
  selectedCountry: string;
  allSearchedCities;
  selectedCity: string;
  toggleButton;

  @ViewChild("apartmentModal",{static: true}) apartmentModal: ApartmentProfileComponent;


  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.propertyId = params['propertyId']);
    this.getProperty();
    console.log(this.userId);
    
  }
  getProperty(){
    this.api.getProperty(this.propertyId).subscribe((property:Property)=>{
      this.property = property;
      console.log(this.property)
      this.api.getApartmentsByPropertyId(this.propertyId).subscribe((apartments:Apartment[])=>{
        this.apartments=apartments;
        this.isLoaded = true;
      });
      this.editPropertyForm = this.fb.group({
        name: [this.property.name, Validators.required],
        type: [this.property.type, Validators.required],
        description: [this.property.description, Validators.required],
        country: [this.property.country, Validators.required],
        cityName: [this.property.cityName, Validators.required],
        street: [this.property.street, Validators.required],
        mapLongitude: [this.property.mapLongitude, Validators.required],
        mapLatitude: [this.property.mapLatitude, Validators.required],
      });
      this.selectedCountry = this.property.country;
      this.selectedCity = this.property.cityName;
      this.toggleButton = this.property.isPublic;
      console.log(this.toggleButton);
    });
    
    this.api.getCountries().subscribe((countries: Country[])=>{
      this.allCountries = countries;
    });
  }

  toggle(){
    if(this.toggleButton == true){
      this.toggleButton = false;
      console.log(this.toggleButton);

    }
    else{
      this.toggleButton = true;
      console.log(this.toggleButton);

    }

    this.property.isPublic = this.toggleButton;
    this.api.updateIsPublic(this.property, this.propertyId).subscribe(()=>{
      this.getProperty();
    });
  }

  openApartmentModal(id: string){
    console.log(this.apartmentModal);
    this.modalOpened = true;
    this.apartmentModal.initialize(id);
  }
  
  counter(i: number) {
    return new Array(i);
  }

  goToAddApartment(){
    console.log(this.propertyId);
    this.router.navigate(["/apartment-add-form",this.propertyId]);
  }

  onSelectCountry(countryName){
    this.selectedCountry = countryName;
    console.log(this.selectedCountry);
    console.log(this.selectedCity);
    this.api.getCityByCountryName(this.selectedCountry).subscribe((cities: CityRequest)=>{
      this.allSearchedCities = cities.data;
      console.log(this.allSearchedCities);
    }); 
  }

  showEditOption(){
    this.edit = true;
  }
  cancelForm(){
    this.edit = false;
    this.selectedCity = this.property.cityName;
    this.selectedCountry = this.property.country;
  }
  saveChanges(){
    console.log("daa")
    if (this.editPropertyForm.valid) {
      this.success = true;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      
      this.api.editProperty(this.editPropertyForm.value, this.propertyId).subscribe(()=>{
        console.log(this.editPropertyForm.value);
        this.getProperty(); 
      });

      this.edit = false;
    } else {
      this.success = false;
      setTimeout(() => {
        this.success = null;
      }, 3000);
    }
  }
}
