import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { Apartment } from '../shared/apartment.model';
import { DatePipe, formatDate } from '@angular/common';
import { Reservation } from '../shared/reservation.model';

@Component({
  selector: "reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
})
export class ReservationComponent implements OnInit {
  apartment:Apartment;
  constructor(private api: ApiService,
    private router:Router,
    private route: ActivatedRoute,
  ) {}

  propertyId=parseInt(this.route.snapshot.queryParamMap.get('propertyId'));
  dateRange0=new Date(this.route.snapshot.queryParamMap.get('dateRange0'));
  dateRange1=new Date(this.route.snapshot.queryParamMap.get('dateRange1'));
  persons=parseInt(this.route.snapshot.queryParamMap.get('persons'));
  period=parseInt(this.route.snapshot.queryParamMap.get('period'));
  reservationId=parseInt(this.route.snapshot.queryParamMap.get('reservation'));
  apartmentId=parseInt(this.route.snapshot.queryParamMap.get('apartmentId'));
  dateRange0Formatted = new Date(formatDate(this.dateRange0,'MM/dd/yyyy','en-US'));
  dateRange1Formatted = new Date(formatDate(this.dateRange1,'MM/dd/yyyy','en-US'));
  userId = parseInt(JSON.parse(sessionStorage.getItem('userId')));
  reservationHistory = JSON.parse(this.route.snapshot.queryParamMap.get('reservationHistory'));
  details = JSON.parse(this.route.snapshot.queryParamMap.get('details'));
  review:string;
  reservation=new Reservation();
  isLoaded=false;
  error:boolean;

  ngOnInit(): void {
    this.api.getApartment(this.apartmentId).subscribe((data:Apartment) => {
      this.apartment=data;
      this.isLoaded=true;
      console.log(this.apartment);
    });
    if(this.reservationHistory != null){
      this.api.getReservation(this.reservationId).subscribe((res:Reservation)=>{
        this.reservation=res;
     });
    }
}
  reserve(){
    if(JSON.parse(sessionStorage.getItem('isLoggedIn')) == false ||
    JSON.parse(sessionStorage.getItem('isLoggedIn')) == null){
      this.error=true;
      setTimeout(() => {
        this.error=false;
    }, 2000);
    }
    else{
      var reservation:Reservation=
        {price:this.apartment.pricePerNight*this.period,
          review:"",checkIn:this.dateRange0Formatted,checkOut:this.dateRange1Formatted,
        userId:this.userId,apartmentId:this.apartmentId, numberOfPersons:this.persons}
          console.log(reservation);
      this.api.addReservation(reservation).subscribe();
      this.router.navigate(["user-profile", this.userId]).then(() => {
        window.location.reload();
      });
    }
  }
  addReview(){
    const editedReservation = new Reservation(this.reservation);
    editedReservation.review = this.review;

    this.api.editReservation(editedReservation)
      .subscribe(() => {
        console.log(editedReservation);
        this.router.navigate(["user-profile", this.userId]);
      },
        (error: Error) => {
          console.log('err', error);
        });

  }
  
}
