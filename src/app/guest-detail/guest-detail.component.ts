import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Guest } from '../guest';
import { GuestService }  from '../guest.service';

@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.component.html',
  styleUrls: ['./guest-detail.component.css']
})
export class GuestDetailComponent implements OnInit {
  @Input() guest;//: Guest;

  constructor(
  	private route: ActivatedRoute,
  	private guestService: GuestService,
  	private location: Location
  ) { }

  ngOnInit(): void {
  	this.getGuest();
  }

  getGuest(): void {
	const id = +this.route.snapshot.paramMap.get('id');
	this.guestService.getGuest(id)
	    .subscribe(guest => this.guest = guest.data);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.guestService.updateGuest(this.guest)
      .subscribe(() => this.goBack());
  }

}
