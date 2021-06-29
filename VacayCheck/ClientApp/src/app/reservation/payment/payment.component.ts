import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { Reservation } from 'src/app/shared/reservation.model';
import {FormValidation} from 'src/app/util/formValidation'
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  
})
export class PaymentComponent implements OnInit {

  flipped = false;
  reservationPrice: number;
  @Input() reservationToPay:Reservation;
  @ViewChild("payment") payment: ModalDirective;
  months = ['January', 'February', 'March', 'April','May','June', 'July', 'August', 'September', 'October','November','December'];
  years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  creditCardForm: FormGroup;
  success: boolean;
  cardNumber: string;
  userId = sessionStorage.getItem('userId');


  constructor(private fb: FormBuilder, private formValidation: FormValidation, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.creditCardForm = this.fb.group({
      fullName: [null, Validators.required],
      monthExpirationDate: [null, Validators.required],
      yearExpirationDate: [null, Validators.required],
      securityCode: [null, Validators.required],
    });
  }

  backCard(){
    this.flipped = true;
  }
  frontCard(){
    this.flipped = false;
  }
  initialize(): void {
    this.payment.show();
  }
  
  payReservation(){
    if (this.creditCardForm.valid) {
      this.success = true;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      console.log("submitted");
      
     this.api.addReservation(this.reservationToPay).subscribe();
      this.router.navigate(["user-profile", this.userId]).then(() => {
        window.location.reload();
      });
      
      
    } else {
      this.success = false;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      
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

  // isFieldValid(field: string){
  //   return this.formValidation.isFieldValid(field,this.creditCardForm);
  // }

  onlyNumeric(e){
    var regex = new RegExp("^[0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }

 
}
