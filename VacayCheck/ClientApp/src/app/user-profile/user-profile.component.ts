import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Favourite } from '../shared/favourite.model';
import { Property } from '../shared/property.model';
import { Reservation } from '../shared/reservation.model';
import { User } from '../shared/user.model';
import {  DatePipe,formatDate } from '@angular/common';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute, private api:ApiService, private router:Router) {
   }

  userId:string;
  activeUser:User;
  isLoaded=false;
  options = ['Saved properties', 'Future reservations', 'Reservations history','Current reservations','My properties'];
  selectedOption='Future reservations';
  savedProperties:Favourite[]=[];
  userReservations:Reservation[]=[];
  currentDate= new Date();
  userProperties:Property[]=[];

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.userId = params['id']);

    this.api.getUser(this.userId).subscribe((activeUser: User) => {
      this.activeUser=activeUser;
      console.log(this.activeUser);
    });
    this.api.getFavouritesByUser(this.userId).subscribe((data: Favourite[]) => {
      this.savedProperties=data;
    });
    this.api.getReservationsByUser(this.userId).subscribe((reservations: Reservation[]) => {
      this.userReservations=reservations;
    });
    this.api.getPropertiesByUser(this.userId).subscribe((myProperties: Property[])=>{
      this.userProperties = myProperties;
      console.log(this.userProperties);
    });
    setTimeout(() => {
      this.isLoaded=true;
      for(var reservation of this.userReservations){
        reservation.checkIn = new Date(formatDate(reservation.checkIn,'MM/dd/yyyy','en-US'));
        reservation.checkOut = new Date(formatDate(reservation.checkOut,'MM/dd/yyyy','en-US'));
      }
  }, 1000);
  }
  changeOption(option){
    this.selectedOption=option;
  }
  deleteFavourite(propertyId:string){
    console.log(propertyId);
    this.api.deleteFavourite(propertyId,this.activeUser.id).subscribe(() => {
      this.api.getFavouritesByUser(this.userId).subscribe((data: Favourite[]) => {
        this.savedProperties=data;
      });
    },
      (error: Error) => {
        console.log(error);
      });
  }
  toReviewPage(reservation:Reservation){
    this.router.navigate(["/reservation"],
    {queryParams:{reservation:reservation.id,reservationHistory:true,apartmentId:reservation.apartmentId}});
  }
  toDetailsPage(reservation:Reservation){
    this.router.navigate(["/reservation"],
    {queryParams:{reservation:reservation.id,reservationHistory:true,apartmentId:reservation.apartmentId,details:true}});
  }
  
  
}
