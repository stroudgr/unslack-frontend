import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  // parameter definitions of the columns
  columns = [
    { columnDef: 'id', header: 'ID',    cell: (room: Room) => `${room.id}` },
    { columnDef: 'name',     header: 'Name',   cell: (room: Room) => `${room.name}`     },
    { columnDef: 'member_ids',   header: 'Members', cell: (room: Room) => `${room.member_ids}`   },
    { columnDef: 'blacklist',   header: 'Blacklist', cell: (room: Room) => `${room.blacklist}`   },
    { columnDef: 'scores',   header: 'Scores', cell: (room: Room) => `${room.scores}`   },
  ];

  slackersRooms: Room[] = this.roomService.getRooms();

  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

}
