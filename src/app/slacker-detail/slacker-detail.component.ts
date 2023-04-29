import { Component, OnInit, Input } from '@angular/core';
import { Slacker } from '../slacker';

// need these since the router creates slacker detail component
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SlackerService } from '../slacker.service';

@Component({
  selector: 'app-slacker-detail',
  templateUrl: './slacker-detail.component.html',
  styleUrls: ['./slacker-detail.component.css']
})

export class SlackerDetailComponent implements OnInit {
  @Input() slacker: Slacker;

  constructor(
    private route: ActivatedRoute,
    private slackerService: SlackerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // this.getSlacker();
  }
  /*
  getSlacker(): void {
    this.slacker = this.slackerService.getSlacker();
      //.subscribe(slacker => this.slacker = slacker);
  }
  getSlacker(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.slackerService.getSlacker(id)
      .subscribe(slacker => this.slacker = slacker);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
   this.slackerService.updateSlacker(this.slacker)
     .subscribe(() => this.goBack());
  }*/

}
