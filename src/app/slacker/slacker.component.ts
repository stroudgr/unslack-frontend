import { Component, OnInit } from '@angular/core';
import { Slacker } from '../slacker';
import { SlackerService } from '../slacker.service';
import { SlackerDetailComponent } from '../slacker-detail/slacker-detail.component';
import { ChartsService } from '../charts.service';
import { TimetrackerService } from '../timetracker.service';
import { Websites } from '../websites';

@Component({
  selector: 'app-slacker',
  templateUrl: './slacker.component.html',
  styleUrls: ['./slacker.component.css']
})
export class SlackerComponent implements OnInit {
  slackerChartType: string = "bar";
  slackerData: any[] = this.chartsService.getWebsitesData().tracked;
  slackerChartCategories: string[] = this.chartsService.getNameCategoriesFromListOfObject(this.slackerData);
  selectedSlacker: Slacker;
  trackerData: any[];
  websiteNames: any[];

  /* slackerService is a singleton instance of SlackerService
  */
  constructor(
    private slackerService: SlackerService,
    private chartsService: ChartsService,
    private timetrackerService: TimetrackerService
  ) { }

  // this runs upon a lifecycle
  // https://angular.io/guide/lifecycle-hooks
  ngOnInit() {
    // this.slackerData = this.chartsService.getWebsitesData().tracked;
    // console.log(this.slackerData);
    this.trackerData = this.timetrackerService.getTrackingData().tracked;
    // console.log('slacker.component ngOnInit', this.trackerData);
    this.websiteNames = this.chartsService.getNameCategoriesFromListOfObject(this.trackerData);
  }


}
