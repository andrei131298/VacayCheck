import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../shared/property.model';
import { Apartment } from '../shared/apartment.model';
import { Reservation } from '../shared/reservation.model';
import { LoaderComponent } from '../loader/loader.component';
import {  formatDate } from '@angular/common';

@Component({
  selector: "search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"],
})

export class SearchResult implements OnInit {
  constructor(private api: ApiService, private router: Router,private route: ActivatedRoute) {
    
  }
  @ViewChild("loader") detailModal: LoaderComponent;
  
  properties:Property[]=[];
  apartments: Apartment[] = [];
  period:number;
  searchText=this.route.snapshot.queryParamMap.get('searchText');
  dateRange0=new Date(this.route.snapshot.queryParamMap.get('dateRange0'));
  dateRange0Formatted=formatDate(this.dateRange0,'MM/dd/yyyy','en-US');
  dateRange1=new Date(this.route.snapshot.queryParamMap.get('dateRange1'));
  dateRange1Formatted=formatDate(this.dateRange1,'MM/dd/yyyy','en-US');
  persons=parseInt(this.route.snapshot.queryParamMap.get('persons'));
  isLoaded=false;
  alreadyReserved:Reservation[]=[];
  activeProperties:Property[]=[];

  counter(i: number) {
    return new Array(i);
  }
  set(propertyId:number){
    this.router.navigate(["/property-profile"],
    {queryParams:{propertyId:propertyId, dateRange0:this.dateRange0Formatted, dateRange1:this.dateRange1Formatted, persons:this.persons, period:this.period}});
    
  }
  
  ngOnInit() {
    this.period = Math.floor((Date.UTC(this.dateRange1.getFullYear(), this.dateRange1.getMonth(), this.dateRange1.getDate()) - Date.UTC(this.dateRange0.getFullYear(), this.dateRange0.getMonth(), this.dateRange0.getDate()) ) /(1000 * 60 * 60 * 24));
    this.api.getProperties().subscribe((properties: Property[]) => {
      this.properties=properties
    });

    this.api.getApartments().subscribe((apartments: Apartment[]) => {
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
        this.apartments.forEach((apartment) =>{
          this.api.getProperty(apartment.propertyId).subscribe((property:Property)=>{
            if (this.activeProperties.find((prop) => prop.name === property.name) === undefined) {
              if (property.name.toLowerCase().includes(this.searchText.toLowerCase())) {
                property.id=apartment.propertyId;
                this.activeProperties.push(property);
              }
            }
          });
        });
        console.log(this.activeProperties);
        this.isLoaded=true;
      });
    });
  }
}
