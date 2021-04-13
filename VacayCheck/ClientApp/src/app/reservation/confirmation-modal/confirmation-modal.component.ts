import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { Reservation } from 'src/app/shared/reservation.model';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  userId = sessionStorage.getItem('userId');
  @Input() reservationToCancel:Reservation;
  @ViewChild("confirmationModal") confirmation: ModalDirective;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  initialize(): void {
    this.confirmation.show();
  }

  cancelReservation(){

    this.api.deleteReservation(this.reservationToCancel).subscribe(()=>{
      this.router.navigate(["user-profile", this.userId]).then(() => {
        window.location.reload();
      });
    });
  }
}
