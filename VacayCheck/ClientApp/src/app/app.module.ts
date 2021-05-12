import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SearchPipe } from "./shared/search.pipe";
import { FieldErrorDisplayComponent } from "./field-error-display/field-error-display.component";
import { HeaderComponent } from "./header/header.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalModule } from "ngx-bootstrap/modal";
import { HomeComponent } from "./home/home.component";
import { CommonModule } from "@angular/common";
import { SignUpComponent } from "./signUp/signUp.component";
import { DetailModalComponent } from "./home/detail-modal/detail-modal.component";
import { SearchResult } from "./search-results/search-results.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./login/login.component";
import { PropertyProfileComponent } from './property-profile/property-profile.component';
import { ReservationComponent } from './reservation/reservation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoaderComponent } from './loader/loader.component';
import { CustomColorDirective } from "./core/directives/custom-color.directive";
import { ErrorInterceptor } from "./core/interceptors/error-interceptor";
import { OwnerLoginComponent } from './owner-login/owner-login.component';
import { PropertyAddFormComponent } from './property-add-form/property-add-form.component';
import { ApartmentAddFormComponent } from './apartment-add-form/apartment-add-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyPropertyComponent } from './my-property/my-property.component';
import { ApartmentProfileComponent } from './apartment-profile/apartment-profile.component';
import { PaymentComponent } from './reservation/payment/payment.component';
import { CreditCardDirective } from "./util/cardNumber.directive";
import { ConfirmationModalComponent } from './reservation/confirmation-modal/confirmation-modal.component';
import { AgmCoreModule } from "@agm/core";
import { SelectApartmentComponent } from './select-apartment/select-apartment.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { EmailSentComponent } from './email-sent/email-sent.component';

@NgModule({
  declarations: [
    SearchPipe,
    ReservationComponent,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    FieldErrorDisplayComponent,
    DetailModalComponent,
    SearchResult,
    PropertyProfileComponent,
    UserProfileComponent,
    LoaderComponent,
    CustomColorDirective,
    OwnerLoginComponent,
    PropertyAddFormComponent,
    ApartmentAddFormComponent,
    MyPropertyComponent,
    ApartmentProfileComponent,
    PaymentComponent,
    CreditCardDirective,
    ConfirmationModalComponent,
    SelectApartmentComponent,
    EmailVerificationComponent,
    EmailSentComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    FontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCoBIRiecH77ZZoNFT529FW9Z6W0uHPIec'
    }),
  ],
  exports: [],
  bootstrap: [AppComponent],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }, 
    ],
})
export class AppModule {}
