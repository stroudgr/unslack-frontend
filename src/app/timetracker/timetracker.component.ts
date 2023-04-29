import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts.service';
import { TimetrackerService } from '../timetracker.service';

@Component({
  selector: 'app-timetracker',
  templateUrl: './timetracker.component.html',
  styleUrls: ['./timetracker.component.css']
})
export class TimetrackerComponent implements OnInit {

  constructor(
    private chartsService: ChartsService,
    private timetrackerService: TimetrackerService
  ) { }

  ngOnInit() {
    console.log(this.timetrackerService.getSites());
  }

}
