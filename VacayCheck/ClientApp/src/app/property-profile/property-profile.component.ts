import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Apartment } from '../shared/apartment.model';
import { Property } from '../shared/property.model';
import { Reservation } from '../shared/reservation.model';
import { LoaderComponent } from '../loader/loader.component';
import { Favourite } from '../shared/favourite.model';
import { formatDate } from '@angular/common';
import { faUser, faBuilding, faStar, faMapMarkerAlt, faInfoCircle, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { ApartmentProfileComponent } from '../apartment-profile/apartment-profile.component';
import { User } from '../shared/user.model';


@Component({
  selector: 'property-profile',
  templateUrl: './property-profile.component.html',
  styleUrls: ['./property-profile.component.css']
})
export class PropertyProfileComponent implements OnInit {


  propertyId=this.route.snapshot.queryParamMap.get('propertyId');
  dateRange0=new Date(this.route.snapshot.queryParamMap.get('dateRange0'));
  dateRange1=new Date(this.route.snapshot.queryParamMap.get('dateRange1'));
  dateRange0Formatted=formatDate(this.dateRange0,'yyyy-MM-dd','en-US');
  dateRange1Formatted=formatDate(this.dateRange1,'yyyy-MM-dd','en-US');
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
  userId = sessionStorage.getItem('userId');
  alreadyReserved:Reservation[]=[];
  error:boolean;
  activeFavourite:Favourite;
  showInfo = false; 
  showInfoForDisabled = false;
  faUser = faUser;
  faBuilding = faBuilding;
  faStar = faStar;
  faMapMarkerAlt = faMapMarkerAlt; 
  faInfoCircle = faInfoCircle;
  faGlobe = faGlobe;
  currentUser = new User();
  hoveredApartmentIndex: number;

  @ViewChild("apartmentModal",{static: true}) apartmentModal: ApartmentProfileComponent;
  constructor(private api: ApiService, private router: Router,private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.api.getAvailableApartments(this.propertyId, this.dateRange0Formatted, this.dateRange1Formatted, this.persons).subscribe((apartments: Apartment[])=>{
      this.apartments = apartments;
      this.isLoaded=true;
      console.log(apartments)
    });
    this.api.getFavouriteByUserAndProperty(this.userId,this.propertyId).subscribe((fav:Favourite)=>{
      this.activeFavourite=fav;
    });
    this.api.getProperty(this.propertyId).subscribe((property:Property)=>{
      this.property = property;
      console.log(this.property)
    });
    this.api.getUser(this.userId).subscribe((user: User)=>{
      this.currentUser = user;
      console.log(this.currentUser);
    });
    
  }
  openApartmentModal(id: string){
    console.log(this.apartmentModal);
    this.apartmentModal.initialize(id);
  }

  counter(i: number) {
    return new Array(i);
  }

  addToFavourites(){
    if(this.activeFavourite == null){
      this.favourite.propertyId=this.propertyId;
      this.favourite.userId=this.userId;
      this.api.addFavourite(this.favourite).subscribe(()=>{
        this.api.getFavouriteByUserAndProperty(this.userId,this.propertyId).subscribe((fav:Favourite)=>{
          this.activeFavourite = fav;
          console.log(this.activeFavourite);
        });
      });
    }
    else{
      this.api.deleteFavourite(this.propertyId,this.userId).subscribe(() => {
        this.api.getFavouriteByUserAndProperty(this.userId,this.propertyId).subscribe((fav:Favourite)=>{
          this.activeFavourite = fav;
          console.log(this.activeFavourite);
        });
      });
    }
  }
  set(apartmentId: string){
    console.log(apartmentId);
  this.router.navigate(["/reservation"],
    {queryParams:{propertyId:this.propertyId, dateRange0:this.dateRange0Formatted, dateRange1:this.dateRange1Formatted, persons:this.persons, apartmentId: apartmentId, period:this.period}});
  }
  changeStyle() {
    this.isFollow = !this.isFollow;
  }
  goToAddApartment(){
    console.log(this.propertyId);
    this.router.navigate(["/apartment-add-form",this.propertyId]);
  }
  goToSelectApartmentPage(apartment: Apartment){
    this.router.navigate(["/select-apartment", apartment.id], {queryParams:{dateRange0:this.dateRange0Formatted, dateRange1:this.dateRange1Formatted, persons:this.persons, period:this.period}});
  }
}
