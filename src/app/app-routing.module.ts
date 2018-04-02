import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestsComponent } from './guests/guests.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { GuestDetailComponent }  from './guest-detail/guest-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: GuestDetailComponent },
  { path: 'guests', component: GuestsComponent }
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
