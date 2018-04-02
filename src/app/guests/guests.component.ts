import { Component, OnInit } from '@angular/core';
//import {Http, Resonse } from '@angular/http';

import { Guest } from '../guest';
import { GuestService } from '../guest.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})

export class GuestsComponent implements OnInit {

  public guests;//: Guest[];

  constructor(private guestService: GuestService) { }

  ngOnInit() {
  	this.getGuests();
  }

  getGuests(): void {
  	this.guestService.getGuests()
  		.subscribe(guests => this.guests = guests.data);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.guestService.addGuest({ name } as Guest)
      .subscribe(guest => {
        this.guests.push(guest);
      });
  }
 
  delete(guest: Guest): void {
    this.guests = this.guests.filter(h => h !== guest);
    this.guestService.deleteGuest(guest).subscribe();
  }


}
