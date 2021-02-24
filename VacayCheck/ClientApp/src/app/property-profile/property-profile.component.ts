import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SearchResult } from '../search-results/search-results.component';
import { Apartment } from '../shared/apartment.model';
import { Property } from '../shared/property.model';
import { Reservation } from '../shared/reservation.model';
import { LoaderComponent } from '../loader/loader.component';
import { Favourite } from '../shared/favourite.model';
import {  formatDate } from '@angular/common';


@Component({
  selector: 'property-profile',
  templateUrl: './property-profile.component.html',
  styleUrls: ['./property-profile.component.css']
})
export class PropertyProfileComponent implements OnInit {

  @ViewChild("loader") detailModal: LoaderComponent;

  constructor(private api: ApiService, private router: Router,private route: ActivatedRoute) {
  }
  propertyId=parseInt(this.route.snapshot.queryParamMap.get('propertyId'));
  dateRange0=new Date(this.route.snapshot.queryParamMap.get('dateRange0'));
  dateRange1=new Date(this.route.snapshot.queryParamMap.get('dateRange1'));
  dateRange0Formatted=formatDate(this.dateRange0,'MM/dd/yyyy','en-US');
  dateRange1Formatted=formatDate(this.dateRange1,'MM/dd/yyyy','en-US');
  persons=parseInt(this.route.snapshot.queryParamMap.get('persons'));
  period=parseInt(this.route.snapshot.queryParamMap.get('period'));
  loggedIn = sessionStorage.getItem("isLoggedIn");
  properties:Property[]=[];
  apartments: Apartment[] = [];
  propertyResults:Property[]=[];
  property:Property;
  isLoaded = false;
  favourite=new Favourite();
  isFollow: boolean = false;
  userId = parseInt(JSON.parse(sessionStorage.getItem('userId')));
  alreadyReserved:Reservation[]=[];
  error:boolean;
  activeFavourite:Favourite;

  ngOnInit() {

    this.api.getApartmentsByPropertyId(this.propertyId).subscribe((apartments:Apartment[])=>{
      this.apartments=apartments;
      this.api.getAlreadyReservedByDates(this.dateRange0Formatted,this.dateRange1Formatted).subscribe((reserved:Reservation[])=>{
        this.alreadyReserved=reserved;
        console.log(this.alreadyReserved);
        for(let res of this.alreadyReserved){
          this.apartments.forEach((apartment, index) => {
            if(apartment.id === res.apartmentId || apartment.maxPersons<this.persons) this.apartments.splice(index,1);
          });
        }
        console.log(this.apartments);
        this.isLoaded=true;
      });
    });
    this.api.getFavouriteByUserAndProperty(this.userId,this.propertyId).subscribe((fav:Favourite)=>{
      this.activeFavourite=fav;
      console.log(this.activeFavourite);
    });
    this.api.getProperty(this.propertyId).subscribe((property:Property)=>{
      this.property=property;
    });
    
  }
  
  counter(i: number) {
    return new Array(i);
  }

  check(){
    if(JSON.parse(sessionStorage.getItem('isLoggedIn')) == false){
      sessionStorage.setItem("triedWithoutLogin", "true");
      console.log(sessionStorage.getItem("triedWithoutLogin"));
      this.router.navigate(["/login"]);
      setTimeout(() => {
        sessionStorage.setItem("triedWithoutLogin", "false");
    }, 1000);
    }
  }
  addToFavourites(){
    if(this.activeFavourite == null){
      this.favourite.propertyId=this.propertyId;
      this.favourite.userId=this.userId;
      this.api.addFavourite(this.favourite).subscribe(()=>{
        this.api.getFavouriteByUserAndProperty(this.userId,this.propertyId).subscribe((fav:Favourite)=>{
          this.activeFavourite=fav;
          console.log(this.activeFavourite);
        });
      });
    }
    else{
      this.api.deleteFavourite(this.propertyId,this.userId).subscribe(() => {
        this.api.getFavouriteByUserAndProperty(this.userId,this.propertyId).subscribe((fav:Favourite)=>{
          this.activeFavourite=fav;
          console.log(this.activeFavourite);
        });
      });
    }
  }
  set(apartmentId: number){
    console.log(apartmentId);
  this.router.navigate(["/reservation"],
    {queryParams:{propertyId:this.propertyId, dateRange0:this.dateRange0Formatted, dateRange1:this.dateRange1Formatted, persons:this.persons, apartmentId: apartmentId, period:this.period}});
  }
  changeStyle() {
    this.isFollow = !this.isFollow;
  }
}
