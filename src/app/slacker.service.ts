import { Injectable } from '@angular/core';
import { Slacker } from './slacker';
import { SLACKER } from './mock-slacker';
import { MessageService } from './message.service';
import { RoomService } from './room.service';


@Injectable()
export class SlackerService {

  constructor(
    private messageService: MessageService,
    private roomService: RoomService
    ) { }

  getSlacker(): Slacker {
    // Todo: send the message _after_ fetching the slacker
    this.log(`fetched slacker id=${SLACKER.id}`);
    // local file version
    return SLACKER;
  }

  getSlackerName(roomId: number): string {
    const name = JSON.parse(localStorage.slackerRoomIdToName)[roomId.toString()];
    if (typeof name !== 'undefined') {
      return name;
    } else {
      return null;
    }
  }

  // Log a SlackerService message with the MessageService
  private log(message: string) {
    this.messageService.add('SlackerService: ' + message);
  }
}
