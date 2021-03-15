import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Apartment } from '../shared/apartment.model';
import { Property } from '../shared/property.model';
import { LoaderComponent } from '../loader/loader.component';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'my-property',
  templateUrl: './my-property.component.html',
  styleUrls: ['./my-property.component.css']
})
export class MyPropertyComponent implements OnInit {

  @ViewChild("loader") detailModal: LoaderComponent;

  constructor(private api: ApiService, private router: Router,private route: ActivatedRoute) {
  }
  propertyId:string;
  loggedIn = sessionStorage.getItem("isLoggedIn");
  properties:Property[]=[];
  apartments: Apartment[] = [];
  property:Property;
  isLoaded = false;
  isFollow: boolean = false;
  userId = sessionStorage.getItem('userId');
  faUser = faUser;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.propertyId = params['propertyId']);
    this.api.getProperty(this.propertyId).subscribe((property:Property)=>{
      this.property=property;
      console.log(this.property)
      this.api.getApartmentsByPropertyId(this.propertyId).subscribe((apartments:Apartment[])=>{
        this.apartments=apartments;
        this.isLoaded = true;
      });
    });
    console.log(this.userId);
    
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
}
