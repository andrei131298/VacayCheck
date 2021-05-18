import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SignUpComponent } from "./signUp/signUp.component";
import { SearchResult } from "./search-results/search-results.component";
import { LoginComponent } from "./login/login.component";
import { PropertyProfileComponent } from './property-profile/property-profile.component';
import { ReservationComponent } from './reservation/reservation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from "./guards/auth.guard";
import { OwnerLoginComponent } from "./owner-login/owner-login.component";
import { PropertyAddFormComponent } from "./property-add-form/property-add-form.component";
import { ApartmentAddFormComponent } from "./apartment-add-form/apartment-add-form.component";
import { MyPropertyComponent } from "./my-property/my-property.component";
import { ApartmentProfileComponent } from "./apartment-profile/apartment-profile.component";
import { PaymentComponent } from "./reservation/payment/payment.component";
import { SelectApartmentComponent } from "./select-apartment/select-apartment.component";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";
import { EmailSentComponent } from "./email-sent/email-sent.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signUp", component: SignUpComponent },
  { path: "search-results", component: SearchResult },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "property-profile", component: PropertyProfileComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: "user-profile/:id", component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: "owner-login", component:OwnerLoginComponent},
  { path: "property-add-form", component:PropertyAddFormComponent},
  { path: "apartment-add-form/:propertyId", component:ApartmentAddFormComponent},
  { path: "my-property/:propertyId", component:MyPropertyComponent},
  { path: "select-apartment/:id", component: SelectApartmentComponent},
  { path: "email-verification/:id", component:EmailVerificationComponent},
  { path: "email-sent", component: EmailSentComponent},
  { path: "password-reset/:id", component: PasswordResetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
