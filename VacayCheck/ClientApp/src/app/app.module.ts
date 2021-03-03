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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApartmentAddFormComponent } from './apartment-add-form/apartment-add-form.component';

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
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  exports: [],
  bootstrap: [AppComponent],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
    ],
})
export class AppModule {}
