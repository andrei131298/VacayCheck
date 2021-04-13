import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Apartment } from '../shared/apartment.model';
import { Property } from '../shared/property.model';
import { LoaderComponent } from '../loader/loader.component';
import { faUser,faBuilding, faStar, faPen, faPlus, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ApartmentProfileComponent } from '../apartment-profile/apartment-profile.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-property',
  templateUrl: './my-property.component.html',
  styleUrls: ['./my-property.component.css']
})
export class MyPropertyComponent implements OnInit {

  @ViewChild("loader") detailModal: LoaderComponent;

  constructor(private api: ApiService, private router: Router,private route: ActivatedRoute, private fb: FormBuilder) {
  }

  editPropertyForm: FormGroup;
  propertyId:string;
  loggedIn = sessionStorage.getItem("isLoggedIn");
  properties:Property[]=[];
  apartments: Apartment[] = [];
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
        propertyName: [this.property.name, Validators.required],
        type: [this.property.type, Validators.required],
        description: [this.property.description, Validators.required],
        country: [this.property.country, Validators.required],
        city: [this.property.cityName, Validators.required],
        street: [this.property.street, Validators.required],
      });
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

  toApartmentPage(apartment:Apartment){
    this.router.navigate(["/apartment-profile", apartment.id]);
  }

  goToAddApartment(){
    console.log(this.propertyId);
    this.router.navigate(["/apartment-add-form",this.propertyId]);
  }

  showEditOption(){
    this.edit = true;
  }
  cancelForm(){
    this.edit = false;
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
