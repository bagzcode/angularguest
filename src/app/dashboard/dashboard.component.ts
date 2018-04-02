import { Component, OnInit } from '@angular/core';
import { Guest } from '../guest';
import { GuestService } from '../guest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  guests: Guest[] = [];

  constructor(private guestService: GuestService) { }

  ngOnInit() {
    this.getGuests();
  }

  getGuests(): void {
    this.guestService.getGuests()
      .subscribe(guests => {this.guests = guests.data});
  }

}