import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuestsComponent } from './guests/guests.component';
import { GuestDetailComponent } from './guest-detail/guest-detail.component';
import { GuestService } from './guest.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GuestsComponent,
    GuestDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    GuestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
