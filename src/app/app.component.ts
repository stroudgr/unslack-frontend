import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ServerService} from './server.service';
import { RoomService } from './room.service';
import { Room } from './room';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Unslack';

  routeLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private router: Router,
    private location: Location,
    private serverService: ServerService,
    private roomService: RoomService) {
    this.routeLinks = [
      {
        label: 'Dashboard',
        link: './dashboard',
        index: 0
      }, {
        label: 'My Slacker Stats',
        link: './slacker',
        index: 1
      }/*, {
        label: 'Rooms',
        link: './room',
        index: 2
      }*/
    ];
    if (!localStorage.slackerRooms) {
      localStorage.slackerRooms = JSON.stringify([]);
    }
    if (!localStorage.slackerRoomIdToName) {
      localStorage.slackerRoomIdToName = JSON.stringify({});
    }
  }
  ngOnInit(): void {
    // this.load();
    // this.router.navigate(['./dashboard']);
    console.log(this.router.url);
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
    console.log(this.router.events);

    // send and update periodically
    Observable.interval(3000).takeWhile(() => true).subscribe(() => this.updateRooms());
    // Observable.interval(60000).takeWhile(() => true).subscribe(() => this.serverService.sendDataRequestToAllRooms());
  }

  /**
   * Updates the rooms to display for the drop down list of rooms.
   */
  updateRooms() {
    const rooms: Room[] = this.roomService.getRooms();
    for (const room of rooms) {
      if (room) {
        this.serverService.updateRoomMembersAndBlacklist(room.id);
        this.serverService.updateRoomScores(room.id);
      }
    }
  }

}
