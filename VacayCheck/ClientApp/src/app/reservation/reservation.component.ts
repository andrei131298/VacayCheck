import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { Apartment } from '../shared/apartment.model';
import { DatePipe, formatDate } from '@angular/common';
import { Reservation } from '../shared/reservation.model';
import { PaymentComponent } from "./payment/payment.component";
import { User } from "../shared/user.model";
import { Property } from "../shared/property.model";
import { faGlobe, faFrown, faMeh, faSmile } from '@fortawesome/free-solid-svg-icons';
import { ApartmentProfileComponent } from "../apartment-profile/apartment-profile.component";


@Component({
  selector: "reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
})
export class ReservationComponent implements OnInit {
  apartment:Apartment;
  errorMessage: string;
  errorMessageRating: string;
  modalOpened = false;
  
  constructor(private api: ApiService,
    private router:Router,
    private route: ActivatedRoute,
  ) {}

  propertyId=this.route.snapshot.queryParamMap.get('propertyId');
  dateRange0=new Date(this.route.snapshot.queryParamMap.get('dateRange0'));
  dateRange1=new Date(this.route.snapshot.queryParamMap.get('dateRange1'));
  persons=parseInt(this.route.snapshot.queryParamMap.get('persons'));
  period=parseInt(this.route.snapshot.queryParamMap.get('period'));
  reservationId=this.route.snapshot.queryParamMap.get('reservation');
  apartmentId=this.route.snapshot.queryParamMap.get('apartmentId');
  dateRange0Formatted = new Date(formatDate(this.dateRange0,'MM/dd/yyyy','en-US'));
  dateRange1Formatted = new Date(formatDate(this.dateRange1,'MM/dd/yyyy','en-US'));
  userId = sessionStorage.getItem('userId');
  reservationHistory = JSON.parse(this.route.snapshot.queryParamMap.get('reservationHistory'));
  futureReservation = JSON.parse(this.route.snapshot.queryParamMap.get('futureReservation'));
  details = JSON.parse(this.route.snapshot.queryParamMap.get('details'));
  ownerReservation = JSON.parse(this.route.snapshot.queryParamMap.get('owner'));
  review = "";
  reservation=new Reservation();
  isLoaded=false;
  error:boolean;
  paymentOptions = ["Pay now with card", "Pay with cash at property"]
  selectedPaymentOption: string;
  owner: User;
  guest: User;
  currentProperty: Property;
  cancellationDateLimit = new Date();
  currentDate = new Date();
  rating = 0;
  faGlobe = faGlobe;
  faFrown = faFrown;
  faMeh = faMeh;
  faSmile = faSmile;
  checkin = new Date();
  @ViewChild("payment") payment: PaymentComponent;
  @ViewChild("confirmation") confirmation: PaymentComponent;
  @ViewChild("apartmentModal",{static: true}) apartmentModal: ApartmentProfileComponent;



  ngOnInit(): void {
    this.api.getApartment(this.apartmentId).subscribe((data:Apartment) => {
      this.apartment=data;
      this.api.getProperty(this.apartment.propertyId).subscribe((property: Property)=>{
        this.currentProperty = property;
        this.api.getUser(this.currentProperty.userId).subscribe((user: User)=>{
          this.owner = user;
          this.isLoaded=true;
        });
      });
    });
    if(this.reservationHistory != null || this.futureReservation != null || this.ownerReservation != null){
      this.api.getReservation(this.reservationId).subscribe((res:Reservation)=>{
        this.reservation=res;
        this.checkin = new Date(this.reservation.checkIn);
        var dateOffset = (24*60*60*1000) * 2; // 2 days
        this.cancellationDateLimit.setTime(this.checkin.getTime() - dateOffset);
        
        this.api.getUser(this.reservation.userId).subscribe((user: User)=>{
          this.guest = user;
        });
     });
     
    }

}
  goToPayment(){
    if(JSON.parse(sessionStorage.getItem('isLoggedIn')) == false ||
    JSON.parse(sessionStorage.getItem('isLoggedIn')) == null){
      this.error=true;
      setTimeout(() => {
        this.error=false;
    }, 2000);
    }
    else{
      this.reservation =
        {price:this.apartment.pricePerNight*this.period,
          review:"",checkIn:this.dateRange0Formatted,checkOut:this.dateRange1Formatted,
        userId:this.userId,apartmentId:this.apartmentId, numberOfPersons:this.persons, paidWithCard: true, rating: this.rating}
          console.log(this.reservation);
       this.payment.initialize();
      
    }
  }
  setRam(value){
    this.rating = value;
    console.log(this.rating);
  }
  addReview(){
    if(this.rating != 0){
      if(this.review != null && this.review != ""){
        const editedReservation = new Reservation(this.reservation);
        editedReservation.review = this.review;
        editedReservation.rating = this.rating;
  
        this.api.editReservation(editedReservation)
          .subscribe(() => {
            console.log(editedReservation);
            this.router.navigate(["user-profile", this.userId]);
          },
            (error: Error) => {
              console.log('err', error);
            });
  
      }
      else{
        this.errorMessage = "Please complete the review";
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    }
    else{
      this.errorMessageRating = "Please select a rating";
      setTimeout(() => {
        this.errorMessageRating = null;
      }, 3000);
    }
    
  }

  radioChange(event: any) {
    this.selectedPaymentOption = event.target.value;
  }

  cancelReservation(reservation: Reservation){

    this.confirmation.initialize();
    // this.api.deleteReservation(reservation).subscribe(()=>{
    //   this.router.navigate(["user-profile", this.userId]).then(() => {
    //     window.location.reload();
    //   });
    // });
  }
  openApartmentModal(id: string){
    this.modalOpened = true;
    this.apartmentModal.initialize(id);
  }
  
}
