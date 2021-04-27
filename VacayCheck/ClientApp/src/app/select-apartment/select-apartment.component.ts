import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { Apartment } from '../shared/apartment.model';
import { faExchangeAlt, faBuilding} from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';
import { Property } from '../shared/property.model';


@Component({
  selector: 'select-apartment',
  templateUrl: './select-apartment.component.html',
  styleUrls: ['./select-apartment.component.css']
})
export class SelectApartmentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  apartmentId: string;
  requestedApartment: Apartment;
  faExchangeAlt = faExchangeAlt;
  faBuilding = faBuilding;
  dateRange0 = new Date(this.route.snapshot.queryParamMap.get('dateRange0'));
  dateRange1 = new Date(this.route.snapshot.queryParamMap.get('dateRange1'));
  persons = parseInt(this.route.snapshot.queryParamMap.get('persons'));
  period = parseInt(this.route.snapshot.queryParamMap.get('period'));
  reservationId = this.route.snapshot.queryParamMap.get('reservation');
  dateRange0Formatted = new Date(formatDate(this.dateRange0,'MM/dd/yyyy','en-US'));
  dateRange1Formatted = new Date(formatDate(this.dateRange1,'MM/dd/yyyy','en-US'));
  userId = sessionStorage.getItem('userId');
  propertyOfRequestedAp: Property;
  userProperties: Property[] = [];
  selectedApartments: Apartment[] = [];
  value: string;
  selectedApartmentId: string;
  selectedApartment: Apartment;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.apartmentId = params['id']);

    this.api.getApartment(this.apartmentId).subscribe((apartment: Apartment)=>{
      this.requestedApartment = apartment;
      this.api.getProperty(this.requestedApartment.propertyId).subscribe((property: Property)=>{
        this.propertyOfRequestedAp = property;
      });
    });
    this.api.getPropertiesByUser(this.userId).subscribe((myProperties: Property[])=>{
      this.userProperties = myProperties;
    });
  }

  selectApartment(valueId: string){
    this.api.getApartmentsByPropertyId(valueId).subscribe((apartments: Apartment[])=>{
      this.selectedApartments = apartments;
      this.selectedApartment = this.selectedApartments[0];
    });
    console.log(valueId);
  }

  apartmentIsSelected(apartmentId: string){
    this.api.getApartment(apartmentId).subscribe((apartment: Apartment)=>{
      this.selectedApartment = apartment;
    });
    console.log(apartmentId);
  }

}
