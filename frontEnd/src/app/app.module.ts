import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes , CanActivate} from '@angular/router';
import { environment } from 'src/environments/environment';
import {HttpClientModule} from '@angular/common/http'
import { NgOtpInputModule } from 'ng-otp-input';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FlashMessagesModule } from 'flash-messages-angular';
import { ProfileComponent } from './components/profile/profile.component';
import { AuctioneerProfileComponent } from './components/auctioneer-profile/auctioneer-profile.component';
import { BidderProfileComponent } from './components/bidder-profile/bidder-profile.component';
import { PostAuctionComponent } from './components/post-auction/post-auction.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { AuctionPageComponent } from './components/auction-page/auction-page.component';
import { AuctionsComponent } from './components/auctions/auctions.component';
import { FetchComponent } from './components/fetch/fetch.component';
import { AuctionsDisplayComponent } from './components/auctions-display/auctions-display.component';
import { EachAuctionComponent } from './components/each-auction/each-auction.component';
import { MainServiceService } from './services/main-service.service';


import { AuctionBidderSectionComponent } from './components/auction-bidder-section/auction-bidder-section.component';
import { AuctionSubscriberSectionComponent } from './components/auction-subscriber-section/auction-subscriber-section.component';
import { AuctionActionSectionComponent } from './components/auction-action-section/auction-action-section.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AuctionEventComponent } from './components/auction-event/auction-event.component';
import { AuctionItemShowComponent } from './components/auction-item-show/auction-item-show.component';
import { TopBidComponent } from './components/top-bid/top-bid.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './components/admin/admin.component';
import { OutdatedAuctionsComponent } from './components/outdated-auctions/outdated-auctions.component';
import { AuctioneersListComponent } from './components/adminSection/auctioneers-list/auctioneers-list.component';
import { BiddersListComponent } from './components/adminSection/bidders-list/bidders-list.component';
import { UpdateIntervalComponent } from './components/adminSection/update-interval/update-interval.component';
import { CitiesComponent } from './components/adminSection/cities/cities.component';
import { CategoriesComponent } from './components/adminSection/categories/categories.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LoginTrialComponent } from './components/login-trial/login-trial.component';

import { AuctionsListComponent } from './components/adminSection/auctions-list/auctions-list.component';
import { AddCategoryComponent } from './components/adminSection/add-category/add-category.component';
import { AddCityComponent } from './components/adminSection/add-city/add-city.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DeleteIconComponent } from './components/delete-icon/delete-icon.component';
import { OtpComponent } from './components/otp/otp.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { FirebaseOptions } from 'firebase/app';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { EachAuctioneerComponent } from './components/each-auctioneer/each-auctioneer.component';
import { FilterAuctionsComponent } from './components/filter-auctions/filter-auctions.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EachHistoryComponent } from './components/each-history/each-history.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NotificationComponent } from './components/notification/notification.component';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { SliderRightComponent } from './components/slider-right/slider-right.component';
import { LOCALE_ID} from '@angular/core';
import { AuthGuard } from './guard/auth.guard';
import { HelpComponent } from './components/help/help.component';
const routes : Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'auctioneerProfile', component:AuctioneerProfileComponent, canActivate:[AuthGuard]},
  {path:'bidderProfile', component:BidderProfileComponent, canActivate:[AuthGuard]},
  {path:'profile', component:ProfileComponent},
  {path:'viewAuction', component:AuctionPageComponent},
  {path:'adminProfile', component:AdminComponent,  canActivate:[AuthGuard]},
  {path:'payment', component:PaymentComponent, canActivate:[AuthGuard]}
  
  ]
 
@NgModule({
  declarations: [
    LoginTrialComponent,
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    ProfileComponent,
    AuctioneerProfileComponent,
    BidderProfileComponent,
    PostAuctionComponent,
    ShowProfileComponent,
    AuctionPageComponent,
    AuctionsComponent,
    FetchComponent,
    AuctionsDisplayComponent,
    EachAuctionComponent,
    AuctionActionSectionComponent,
    AuctionSubscriberSectionComponent,
    AuctionBidderSectionComponent,
    ConfirmDialogComponent,
    AuctionEventComponent,
    AuctionItemShowComponent,
    TopBidComponent,
    AdminComponent,
    OutdatedAuctionsComponent,
    AuctioneersListComponent,
    BiddersListComponent,
    UpdateIntervalComponent,
    CitiesComponent,
    CategoriesComponent,
    EditProfileComponent,
    AuctionsListComponent,
    AddCategoryComponent,
    AddCityComponent,
    NotFoundComponent,
    DeleteIconComponent,
    OtpComponent,
    UpdatePasswordComponent,
    EachAuctioneerComponent,
    FilterAuctionsComponent,
    LandingPageComponent,
    EachHistoryComponent,
    PaymentComponent,
    NotificationComponent,
    HistoryListComponent,
    SliderRightComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    FontAwesomeModule,
    NgOtpInputModule,   
     AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  providers: [MainServiceService, AuthGuard],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
