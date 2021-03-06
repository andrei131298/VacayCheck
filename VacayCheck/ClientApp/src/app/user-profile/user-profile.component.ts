import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Favourite } from '../shared/favourite.model';
import { Property } from '../shared/property.model';
import { Reservation } from '../shared/reservation.model';
import { User } from '../shared/user.model';
import {  DatePipe,formatDate } from '@angular/common';
import { Apartment } from '../shared/apartment.model';
import { faPortrait, faPlusCircle, faPen, faTimes, faExchangeAlt} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExchangeRequest } from '../shared/exchangeRequest.model';
import { ApartmentProfileComponent } from '../apartment-profile/apartment-profile.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CityRequest } from '../shared/cityRequest.model';
import { Country } from '../shared/country.model';
import { FormValidation } from '../util/formValidation';


@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute, private api:ApiService, private router:Router, 
    private fb: FormBuilder, private fv: FormValidation) {
   }

  editUserForm: FormGroup;
  bankAccountForm: FormGroup;
  userId:string;
  activeUser = new User();
  isLoaded=false;
  options = ['Profile', 'Saved properties', 'Future reservations', 'Reservations history','Current reservations','Hosting', 'Travel Requests'];
  requestsOptions = ["Your requests", "Requests on your properties"];
  selectedOption='Profile';
  selectedRequest = "Your requests";
  statuses = ['All statuses','Pending', 'Accepted', 'Declined', 'Overtime'];
  selectedStatus = 'All statuses';
  reservationsStatuses = ['All reservations', 'Completed', 'Upcoming', 'Current']
  selectedReservationsStatus = "All reservations"
  propertiesOptions = ["Properties list", "Reservations", "Payments"];
  selectedPropertyOption = 'Properties list'
  savedProperties:Favourite[]=[];
  userReservations:Reservation[]=[];
  currentDate= new Date();
  userProperties:Property[]=[];
  selectedPhoto: string;
  selectedIndex = 0;
  selectedRequestIndex = 0;
  selectedPropertiesIndex = 0;
  faPortrait = faPortrait;
  faPlusCircle = faPlusCircle;
  faPen = faPen;
  faTimes = faTimes;
  faExchangeAlt = faExchangeAlt;
  futureReservations: Reservation[]=[];
  reservationsHistory: Reservation[]=[];
  currentReservations: Reservation[]=[];
  futurePropertyReservations: Reservation[]=[];
  propertyReservationsHistory: Reservation[]=[];
  currentPropertyReservations: Reservation[]=[];
  allReservedApartments: Apartment[]=[];
  edit = false;
  editAccount = false;
  success: boolean;
  exchangesRequested: ExchangeRequest[]=[];
  exchangesToRespond: ExchangeRequest[]=[];
  calendarIsShown = false;
  bsRangeValue: Date;
  maxDate=new Date();
  minDate=new Date();
  dateRange0Formatted:string;
  dateRange1Formatted:string;
  availabilityMessage: string;
  requesterReservation = new Reservation();
  responderReservation = new Reservation();
  nrOfPersons: number;
  selectedCountry: string;
  allSearchedCities;
  allCountries: Country[] = [];
  selectedCity: string;
  selectedExchange: number;


  @ViewChild("apartmentModal",{static: true}) apartmentModal: ApartmentProfileComponent;



  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.userId = params['id']);
    this.maxDate.setFullYear(this.maxDate.getFullYear()+1);

    this.refreshPage();
    this.api.getCountries().subscribe((countries: Country[])=>{
      this.allCountries = countries;
    });
  }

  refreshPage(){
    this.getCurrentUser();

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
      this.futureReservations = [];
      this.reservationsHistory = [];
      this.currentReservations = [];
      this.userReservations.forEach(reservation =>{
        this.api.getApartment(reservation.apartmentId).subscribe((apartment:Apartment)=>{
          reservation.apartment = apartment;
        
          if(new Date(reservation.checkIn) > this.currentDate && new Date(reservation.checkOut) > this.currentDate ){
            this.futureReservations.push(reservation);
            this.futureReservations.sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime());

          }
          if(new Date(reservation.checkIn) < this.currentDate && new Date(reservation.checkOut) < this.currentDate){
            this.reservationsHistory.push(reservation);
            this.reservationsHistory.sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime());
          }
          if(new Date(reservation.checkIn) < this.currentDate && new Date(reservation.checkOut) > this.currentDate){
            this.currentReservations.push(reservation);
            this.currentReservations.sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime());

          }
        });
      });
      
    });

    this.api.getPropertiesByUser(this.userId).subscribe((myProperties: Property[])=>{
      this.userProperties = myProperties;
    });

    this.api.getExchangeRequestByRequester(this.userId).subscribe((requests: ExchangeRequest[])=>{
      this.exchangesRequested = requests;
      this.exchangesRequested.sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime());
      this.exchangesRequested.forEach((request: ExchangeRequest)=>{
        this.api.getApartment(request.requesterApartmentId).subscribe((apartment: Apartment)=>{
          request.requesterApartmentName = apartment.apartmentName;
        });
        this.api.getApartment(request.responderApartmentId).subscribe((ap: Apartment)=>{
          request.responderApartmentName = ap.apartmentName;
        });
      });
    });

    this.getExchangeRequestsByResponder();

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
      this.activeUser = activeUser;
      
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
        cityName: [this.activeUser.cityName, Validators.required]
  
      });
      this.bankAccountForm = this.fb.group({
        fullName: [this.activeUser.cardHolderName, Validators.required],
        iban: [this.activeUser.bankAccount, Validators.required]
  
      });

      this.selectedCountry = this.activeUser.country;
      this.selectedCity = this.activeUser.cityName;
      this.futurePropertyReservations = [];
      this.propertyReservationsHistory = [];
      this.currentPropertyReservations = [];
      this.activeUser.userPropertiesReservations.sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime());
      this.activeUser.userPropertiesReservations.forEach(reservation =>{
        this.api.getApartment(reservation.apartmentId).subscribe((apartment:Apartment)=>{
          console.log(reservation);
          reservation.apartment = apartment;
          this.api.getProperty(apartment.propertyId).subscribe((property: Property)=>{
            reservation.propertyName = property.name;
            
            if(new Date(reservation.checkIn) > this.currentDate && new Date(reservation.checkOut) > this.currentDate ){
              reservation.status = "Upcoming";
              this.futurePropertyReservations.push(reservation);
              console.log("upcoming");

            }
            if(new Date(reservation.checkIn) < this.currentDate && new Date(reservation.checkOut) < this.currentDate){
              reservation.status = "Completed";
              this.propertyReservationsHistory.push(reservation)
            }
            if(new Date(reservation.checkIn) < this.currentDate && new Date(reservation.checkOut) > this.currentDate){
              reservation.status = "Current";
              this.currentPropertyReservations.push(reservation);
              console.log("current");


            }
            // console.log(this.futurePropertyReservations)
          });
          
        
        });
      });
    });
  }

  get f() {
    return this.editUserForm.controls;
  }
  

  getExchangeRequestsByResponder(){
    this.api.getExchangeRequestByResponder(this.userId).subscribe((requests: ExchangeRequest[])=>{
      this.exchangesToRespond = requests;
      this.exchangesToRespond.sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime());
      this.exchangesToRespond.forEach((request: ExchangeRequest)=>{
        this.api.getApartment(request.requesterApartmentId).subscribe((apartment: Apartment)=>{
          request.requesterApartmentName = apartment.apartmentName;
        });
        this.api.getApartment(request.responderApartmentId).subscribe((ap: Apartment)=>{
          request.responderApartmentName = ap.apartmentName;
        });
      });
    });
  }

  onSelectCountry(countryName){
    this.selectedCountry = countryName;
    console.log(this.selectedCountry);
    console.log(this.selectedCity);
    this.api.getCityByCountryName(this.selectedCountry).subscribe((cities: CityRequest)=>{
      this.allSearchedCities = cities.data;
      console.log(this.allSearchedCities);
    }); 
  }

  saveChanges(){
    if (this.editUserForm.valid) {
      this.success = true;
      console.log(this.editUserForm);
      setTimeout(() => {
        this.success = null;
      }, 3000);
      this.api.updateUserDetails(this.editUserForm.value, this.activeUser.id).subscribe(()=>{
        console.log(this.editUserForm.value);
        this.getCurrentUser();
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
    this.selectedOption = option;
  }
  changeRequestOption(requestOption){
    this.selectedRequest = requestOption;
  }
  changePropertiesOption(propertiesOption){
    this.selectedPropertyOption = propertiesOption;
  }
  selectStatus(value: string){
    this.selectedStatus = value;
    console.log(this.selectedStatus);
  }
  selectReservationStatus(value: string){
    this.selectedReservationsStatus = value;
    console.log(this.selectedReservationsStatus);
  }
  cancelForm(){
    this.edit = false;
    this.selectedCity = this.activeUser.cityName;
    this.selectedCountry = this.activeUser.country;
  }
  openApartmentModal(id: string){
    this.apartmentModal.initialize(id);
  }
  deleteFavourite(propertyId:string){
    console.log(propertyId);
    this.api.deleteFavourite(propertyId,this.activeUser.id).subscribe(() => {
      this.api.getFavouritesByUser(this.userId).subscribe((data: Favourite[]) => {
        this.savedProperties=data;
        this.savedProperties.forEach(favourite=>{
          this.api.getProperty(favourite.propertyId).subscribe((property: Property)=>{
            favourite.property = property;
          });
        });
      });
    },
      (error: Error) => {
        console.log(error);
      });
  }
  showEditOption(){
    this.edit = true;
  }
  showEditOptionForAccount(){
    this.editAccount = true;
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
  toOwnerReservationDetails(reservation:Reservation){
    this.router.navigate(["/reservation"],
    {queryParams:{reservation:reservation.id, propertyId: reservation.propertyId, apartmentId:reservation.apartmentId, owner:true}});
  }
  goToProperty(property:Property){
    console.log(property);
    this.router.navigate(["my-property", property.id]);
  }
  updateBankAccount(){
    if(this.bankAccountForm.valid){
      this.activeUser.bankAccount = this.bankAccountForm.controls.iban.value;
      this.activeUser.cardHolderName = this.bankAccountForm.controls.fullName.value;
      console.log(this.activeUser);
      this.api.editUser(this.activeUser).subscribe(()=>{
        this.getCurrentUser();
        this.editAccount = false;
      });
    }
    else{
      this.fv.validateAllFormFields(this.bankAccountForm);
    }
    
  }
  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field, this.bankAccountForm),
      "has-feedback": this.isFieldValid(field, this.bankAccountForm),
    };
  }

  isFieldValid(field: string, form: FormGroup){
    return this.fv.isFieldValid(field,form);
  }

  public setRow(_index: number) {
    this.selectedIndex = _index;
  }

  public setRequestRow(_index: number) {
    this.selectedRequestIndex = _index;
  }
  public setPropertiesRow(_index: number) {
    this.selectedPropertiesIndex = _index;
  }
  checkAvailibility(apartmentId, requesterCheckin, requesterCheckout){
    if(this.nrOfPersons >=1 && this.bsRangeValue){
      this.dateRange0Formatted = formatDate(this.bsRangeValue[0],'MM-dd-yyyy','en-US');
      this.dateRange1Formatted = formatDate(this.bsRangeValue[1],'MM-dd-yyyy','en-US');
      if(this.bsRangeValue[1].valueOf() != this.bsRangeValue[0].valueOf())
      {
        this.api.checkApartmentAvailability(apartmentId, requesterCheckin, requesterCheckout, this.dateRange0Formatted, this.dateRange1Formatted, this.nrOfPersons).subscribe((message: string)=>{
          this.availabilityMessage = message;
        },
        (error: HttpErrorResponse) => {
          this.availabilityMessage = error.error.text;
        });
      }
    }
    
  }
  cancelCheck(){
    this.availabilityMessage = null;
    this.calendarIsShown = false;
    this.bsRangeValue = null;
  }
  openCalendar(i: number){
    this.calendarIsShown = true;
    this.selectedExchange = i;
  }
  confirmExchange(request: ExchangeRequest){
    this.acceptRequest(request);
    this.requesterReservation =
        {price:0,review:"",checkIn: request.checkIn, checkOut:request.checkOut,
        userId:request.requesterId, apartmentId: request.responderApartmentId, numberOfPersons: request.numberOfPersons, rating: 0}
    this.responderReservation =
        {price:0,review:"",checkIn: new Date(this.dateRange0Formatted), checkOut: new Date(this.dateRange1Formatted),
        userId:request.responderId, apartmentId: request.requesterApartmentId, numberOfPersons: this.nrOfPersons, rating: 0}
    this.api.addReservation(this.requesterReservation).subscribe(()=>{
      this.api.addReservation(this.responderReservation).subscribe(()=>{
        this.refreshPage();
        this.cancelCheck();
      });
    });
    console.log(this.requesterReservation);
    console.log(this.responderReservation);

  }
  acceptRequest(request: ExchangeRequest){
    request.status = "Accepted";
    console.log(request);
    this.api.updateExchangeRequest(request).subscribe(()=>{
      this.getExchangeRequestsByResponder();
    });
  }
  declineRequest(request: ExchangeRequest){
    request.status = "Declined";
    this.api.updateExchangeRequest(request).subscribe(()=>{
      this.getExchangeRequestsByResponder();
    });
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

  onlyAlphaNumeric(e){
    var regex = new RegExp("^[a-zA-Z ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }

  onlyNumeric(e){
    var regex = new RegExp("^[0-9A-Z ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }
  
}
