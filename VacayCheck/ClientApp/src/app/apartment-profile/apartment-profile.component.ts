import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { ApiService } from 'src/services/api.service';
import { Apartment } from '../shared/apartment.model';
import { Property } from '../shared/property.model';
import { faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import { Reservation } from '../shared/reservation.model';
import { User } from '../shared/user.model';

@Component({
  selector: 'apartment-profile',
  templateUrl: './apartment-profile.component.html',
  styleUrls: ['./apartment-profile.component.css']
})
export class ApartmentProfileComponent implements OnInit {
  @ViewChild("apartmentModal",{static: true}) apartmentModal: ModalDirective;
  apartmentId: string;
  activeApartment: Apartment;
  activeProperty: Property;
  mainPhoto: string;
  selectedIndex = 0;
  faUser = faUser;
  faComment = faComment;
  showNumber = 3;
  show = false;
  apartmentsReservations: Reservation[] = [];


  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {  
  }

  initialize(id: string): void {
    this.apartmentId = id;
    this.apartmentModal.show();
    this.api.getApartment(this.apartmentId).subscribe((apartment: Apartment) =>{
      this.activeApartment = apartment;
      console.log(this.activeApartment);
      this.mainPhoto = this.activeApartment.photos[0];
      this.api.getProperty(this.activeApartment.propertyId).subscribe((property:Property)=>{
        this.activeProperty = property;
      });
      this.api.getReservationsByApartment(this.apartmentId).subscribe((reservations:Reservation[])=>{
        this.apartmentsReservations = reservations;
        console.log(this.apartmentsReservations);
        this.apartmentsReservations.sort((a,b)=>new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime());
        console.log(this.apartmentsReservations);
        this.apartmentsReservations.forEach((reservation:Reservation) =>{
          this.api.getUser(reservation.userId).subscribe((user: User)=>{
            reservation.userFirstName = user.firstName;
          });
        });
      });
      console.log(this.apartmentsReservations)
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  becomeMainPhoto(photo:string){
    this.mainPhoto = photo;
  }

  public setSelected(_index: number) {
    this.selectedIndex = _index;
  }

}
