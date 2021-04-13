import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Favourite } from '../shared/favourite.model';
import { Property } from '../shared/property.model';
import { Reservation } from '../shared/reservation.model';
import { User } from '../shared/user.model';
import {  DatePipe,formatDate } from '@angular/common';
import { Apartment } from '../shared/apartment.model';
import { faPortrait, faPlusCircle, faPen, faTimes} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute, private api:ApiService, private router:Router, private fb: FormBuilder) {
   }

  editUserForm: FormGroup;
  userId:string;
  activeUser:User;
  isLoaded=false;
  options = ['Profile', 'Saved properties', 'Future reservations', 'Reservations history','Current reservations','My properties'];
  selectedOption='Profile';
  savedProperties:Favourite[]=[];
  userReservations:Reservation[]=[];
  currentDate= new Date();
  userProperties:Property[]=[];
  selectedPhoto: string;
  selectedIndex: number;
  faPortrait = faPortrait;
  faPlusCircle = faPlusCircle;
  faPen = faPen;
  faTimes = faTimes;
  futureReservations: Reservation[]=[];
  reservationsHistory: Reservation[]=[];
  currentReservations: Reservation[]=[];
  edit = false;
  success: boolean;


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.userId = params['id']);
    
    this.getCurrentUser()

    this.api.getFavouritesByUser(this.userId).subscribe((data: Favourite[]) => {
      this.savedProperties=data;
      this.savedProperties.forEach(favourite=>{
        this.api.getProperty(favourite.propertyId).subscribe((property: Property)=>{
          favourite.property = property;
        });
      });
    });
    this.api.getReservationsByUser(this.userId).subscribe((reservations: Reservation[]) => {
      this.userReservations=reservations;
      this.userReservations.forEach(reservation =>{
        this.api.getApartment(reservation.apartmentId).subscribe((apartment:Apartment)=>{
          reservation.apartment = apartment;
          if(new Date(reservation.checkIn) > this.currentDate && new Date(reservation.checkOut) > this.currentDate ){
            this.futureReservations.push(reservation)
          }
          if(new Date(reservation.checkIn) < this.currentDate && new Date(reservation.checkOut) < this.currentDate){
            this.reservationsHistory.push(reservation)
          }
          if(new Date(reservation.checkIn) < this.currentDate && new Date(reservation.checkOut) > this.currentDate){
            this.currentReservations.push(reservation)
          }
        });
      });
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

  getCurrentUser(){
    this.api.getUser(this.userId).subscribe((activeUser: User) => {
      this.activeUser=activeUser;
      console.log(this.activeUser);
      this.editUserForm = this.fb.group({
        firstName: [this.activeUser.firstName, Validators.required],
        lastName: [this.activeUser.lastName, Validators.required],
        email: [this.activeUser.email, Validators.required],
        birthDate: [new Date(formatDate(this.activeUser.birthDate,'MM/dd/yyyy','en-US')), Validators.required],
        sex: [this.activeUser.sex, Validators.required],
        address: [this.activeUser.address, Validators.required],
        phoneNumber: [this.activeUser.phoneNumber, Validators.required],
        country: [this.activeUser.country, Validators.required],
        city: [this.activeUser.city, Validators.required]
  
      });
    });
  }

  get f() {
    return this.editUserForm.controls;
  }

  saveChanges(){
    if (this.editUserForm.valid) {
      this.success = true;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      this.api.updateUserDetails(this.editUserForm.value, this.activeUser.id).subscribe(()=>{
        this.getCurrentUser()
      });

      this.edit = false;
    } else {
      this.success = false;
      setTimeout(() => {
        this.success = null;
      }, 3000);
    }
  }

  changeOption(option){
    this.selectedOption=option;
  }
  cancelForm(){
    this.edit = false
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
  showEditOption(){
    this.edit = true;
  }
  toReviewPage(reservation:Reservation){
    this.router.navigate(["/reservation"],
    {queryParams:{reservation:reservation.id, reservationHistory:true,apartmentId:reservation.apartmentId}});
  }
  toDetailsPage(reservation:Reservation){
    this.router.navigate(["/reservation"],
    {queryParams:{reservation:reservation.id, reservationHistory:true,apartmentId:reservation.apartmentId,details:true}});
  }
  toReservationDetails(reservation:Reservation){
    this.router.navigate(["/reservation"],
    {queryParams:{reservation:reservation.id, futureReservation:true, propertyId: reservation.propertyId, apartmentId:reservation.apartmentId,details:true}});
  }
  goToProperty(property:Property){
    console.log(property);
    this.router.navigate(["my-property", property.id]);
  }

  public setRow(_index: number) {
    this.selectedIndex = _index;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                  reader.onload = (event:any) => {
                  this.selectedPhoto = event.target.result;
                  console.log(event.target.result);
                   
                }
                reader.readAsDataURL(event.target.files[i]);
        }

        const editedUser = new User(this.activeUser);
        setTimeout( () => { 
          editedUser.profilePhoto = this.selectedPhoto;
          this.api.editUser(editedUser).subscribe(()=>{
            this.api.getUser(this.userId).subscribe((activeUser: User) => {
              this.activeUser = activeUser;
            });
          });
        }, 2000 );
    }
  }
  
}
