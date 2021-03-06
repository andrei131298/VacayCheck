import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { ApiService } from 'src/services/api.service';
import { Apartment } from '../shared/apartment.model';
import { Property } from '../shared/property.model';
import { faUser, faComment, faPen, faTimes, faCheck, faGlobe, faFrown , faMeh, faSmile} from '@fortawesome/free-solid-svg-icons';
import { Reservation } from '../shared/reservation.model';
import { User } from '../shared/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Photo } from '../shared/photo.model';

@Component({
  selector: 'apartment-profile',
  templateUrl: './apartment-profile.component.html',
  styleUrls: ['./apartment-profile.component.css']
})
export class ApartmentProfileComponent implements OnInit {
  @ViewChild("apartmentModal",{static: true}) apartmentModal: ModalDirective;
  apartmentId: string;
  activeApartment = new Apartment();
  activeProperty = new Property();
  mainPhoto = new Photo();
  selectedIndex = 0;
  faUser = faUser;
  faComment = faComment;
  faPen = faPen;
  faTimes = faTimes;
  faCheck = faCheck;
  faGlobe = faGlobe;
  faFrown = faFrown;
  faSmile = faSmile;
  faMeh = faMeh;
  showNumber = 3;
  show = false;
  apartmentsReservations: Reservation[] = [];
  edit = false;
  editPhotos = false;
  success: boolean;
  editApartmentForm: FormGroup;
  newPhotos=[];
  newPhoto = new Photo();
  newPath: string;
  userId = sessionStorage.getItem('userId');
  apartmentHasReviews = false;
  apartmentDescription: string;
  apartmentName: string;



  constructor(private api: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {  
  }

  initialize(id: string): void {
    this.apartmentId = id;
    this.apartmentModal.show();
    this.getApartmentDetails();
  }

  enableEditPhotos(){
    this.editPhotos = true;
    this.edit = false;
  }
  cancelEditPhotos(){
    this.editPhotos = false;

  }
  getApartmentDetails(){
    this.api.getApartment(this.apartmentId).subscribe((apartment: Apartment) =>{
      this.activeApartment = apartment;
      console.log(this.activeApartment);
      this.editApartmentForm = this.fb.group({
        apartmentName: [this.activeApartment.apartmentName, Validators.required],
        numberOfRooms: [this.activeApartment.numberOfRooms, Validators.required],
        pricePerNight: [this.activeApartment.pricePerNight, Validators.required],
        maxPersons: [this.activeApartment.maxPersons, Validators.required],
        description: [this.activeApartment.description, Validators.required]
  
      });
      this.apartmentName = this.activeApartment.apartmentName;
      this.apartmentDescription = this.activeApartment.description;
      this.mainPhoto = this.activeApartment.photoObjects[0];
      this.selectedIndex = 0;
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
            if(reservation.review != ""){
              this.apartmentHasReviews = true;  
            }
          });
        });
      });
      console.log(this.apartmentsReservations)
    });
  }

  deletePhoto(photo: Photo){
    if(this.activeApartment.photoObjects.length > 1){
      console.log(photo);
      this.api.deletePhoto(photo).subscribe(()=>{
        this.getApartmentDetails();
      });
    }
    
  }

  counter(i: number) {
    return new Array(i);
  }

  showEditOption(){
    this.edit = true;
    this.editPhotos = false;

  }
  
  saveChanges(){
    if (this.editApartmentForm.valid) {
      this.success = true;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      this.api.editApartment(this.editApartmentForm.value, this.activeApartment.id).subscribe(()=>{
        this.getApartmentDetails();
        window.location.reload()
      });

      this.edit = false;
    } else {
      this.success = false;
      setTimeout(() => {
        this.success = null;
      }, 3000);
    }
  }

  cancelForm(){
    this.edit = false
  }

  becomeMainPhoto(photo:Photo){
    this.mainPhoto = photo;
  }

  public setSelected(_index: number) {
    this.selectedIndex = _index;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  this.newPath = event.target.result;
                  this.newPhoto.apartmentId = this.activeApartment.id;
                  this.newPhoto.path = this.newPath;
                  console.log(this.newPhoto);
                  this.api.addPhoto(this.newPhoto).subscribe(()=>{
                    this.getApartmentDetails();
                  });
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  isFieldValid(field: string) {
    return (
      !this.editApartmentForm.get(field).valid && this.editApartmentForm.get(field).touched
    );
  }

}
