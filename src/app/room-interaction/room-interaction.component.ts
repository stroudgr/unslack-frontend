import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Room } from '../room';
import { RoomService } from '../room.service';
import { ServerService } from '../server.service';
import { SlackerService } from '../slacker.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-room-interaction',
  templateUrl: './room-interaction.component.html',
  styleUrls: ['./room-interaction.component.css']
})
export class RoomInteractionComponent implements OnInit, OnChanges {
  @Input() rooms: Room[] = this.roomService.getRooms();
  createRoomNameField = '';
  createRoomUserNameField = '';
  joinRoomIDField = '';
  joinRoomUserNameField = '';
  // field for a new change room settings component
  // with a dropdown menu to select a room
  changeRoomSettingsIDField = '';
  changeRoomAddBlacklistField = ''; // comma separated
  changeRoomRemoveBlacklistField = ''; // comma separated
  createdRoomId = '';

  // Success messages
  successMsgCreate = '';
  successMsgJoin = '';
  successMsgChangeRoomSettings = '';

  // Error Messages
  errorMsgCreate = '';
  errorMsgJoin = '';
  errorMsgChangeRoomSettings = '';

  panelOpenState = false;

  constructor(
    private roomService: RoomService,
    private serverService: ServerService,
    private slackerService: SlackerService
  ) { }

  ngOnInit() {
    Observable.interval(30000).takeWhile(() => true).subscribe(
      () => {
        this.rooms = this.roomService.getRooms();
      }
    );
  }

  ngOnChanges() {
  }

  join() {
    this.successMsgJoin = '';
    if (this.joinRoomIDField === '' || this.joinRoomIDField.match(/^[0-9]+$/gi) === null) {
      this.errorMsgJoin = 'Please enter a valid room id.';
      return;
    } else if (this.joinRoomUserNameField === '') {
      this.errorMsgJoin = 'Please enter a user id.';
      return;
    } else {
      this.errorMsgJoin = '';
    }

    const msg = {
      MessageType: 'JoinRoomRequest',
      RoomId: this.joinRoomIDField,
      UserName: this.joinRoomUserNameField
    };

    const roomId: number = parseInt(this.joinRoomIDField, 10);

    // check if user has already joined this room
    if (!this.slackerService.getSlackerName(roomId)) {
      this.serverService.joinRoomRequest(msg).subscribe(
        data => {
          if (data['MessageType'] !== 'Error') {
            this.serverService.addNewRoomToLocal(roomId, data['RoomName']);
            this.serverService.addRoomIdToNameToLocal(roomId, this.joinRoomUserNameField);
            this.successMsgJoin = `Successfully Joined Room ${roomId}!`;
            this.rooms = this.roomService.getRooms();
          } else {
            // console.log(data);
            this.errorMsgJoin = data['ErrorMessage'];
          }
        },
        err => alert(JSON.stringify(err))
      );
    } else {
      // console.log('Error: Already joined room:', roomId);
      this.errorMsgJoin = `Error: Already joined room ${roomId}`;
    }
  }

  /**
   * Upon receipt of a new room id hash, create a new room and save it in the LocalStorage
   */
  create() {
    this.successMsgCreate = '';
    if (this.createRoomUserNameField === '') {
      this.errorMsgCreate = 'Please enter a user name.';
      return;
    } else if (this.createRoomNameField === '') {
      this.errorMsgCreate = 'Please enter a valid room id.';
      return;
    } else {
      this.errorMsgCreate = '';
    }

    const msg = {
      MessageType: 'CreateRoomRequest',
      UserName: this.createRoomUserNameField,
      RoomName: this.createRoomNameField
    };
    const subscriber = this.serverService.createRoomRequest(msg).subscribe(
      data => {
        if (data['MessageType'] !== 'Error') {
          this.serverService.addNewRoomToLocal(data['RoomId'], this.createRoomNameField);
          this.serverService.addRoomIdToNameToLocal(data['RoomId'], this.createRoomUserNameField);
          // This is the correct way to set the string but can't tell if server
          // is retrieving and displaying the message
          this.createdRoomId = data['RoomId'];
          this.successMsgCreate = 'Successfully Created a New Room!';
          this.rooms = this.roomService.getRooms();
        } else {
          // console.log('subscribe data: ', data);
          this.errorMsgCreate = data['ErrorMessage'];
        }
      },
      err => alert(JSON.stringify(err))
    );
    // console.log('create subscriber: ', subscriber);
    document.getElementById('welcomeDiv').style.display = 'inline-block';

  }

  changeRoomSettings() {
    this.successMsgChangeRoomSettings = '';
    if (this.changeRoomSettingsIDField === '' || this.changeRoomSettingsIDField.match(/^[0-9]+$/gi) === null) {
      this.errorMsgChangeRoomSettings = 'Please enter a valid room id.';
      return;
    }

    const ATB = this.websiteParser(this.changeRoomAddBlacklistField);
    const RFB = this.websiteParser(this.changeRoomRemoveBlacklistField);

    if (ATB.length === 0 && RFB.length === 0) {
      this.errorMsgChangeRoomSettings = 'No sites were entered.';
      return;
    }

    for (const blacklistedSite of ATB) {
      if (blacklistedSite) {
        if (blacklistedSite.match(/https:\/\/www\..+\.[a-z]{2,}/gi) === null) {
          this.errorMsgChangeRoomSettings = 'Please include www. before each blacklisted website, ' +
          'do not include https://, and include the top level domain (e.g. .com, .edu...)';
          return;
        }
      }
    }

    for (const removeListedSite of ATB) {
      if (removeListedSite) {
        if (removeListedSite.match(/https:\/\/www\..+\.[a-z]{2,}/gi) === null) {
          this.errorMsgChangeRoomSettings = 'Please include www. before each blacklist removed website, ' +
          'do not include https://, and include the top level domain (e.g. .com, .edu...)';
          return;
        }
      }
    }

    this.errorMsgChangeRoomSettings = '';

    const msg = {
      MessageType: 'ChangeRoomSettingsRequest',
      RoomId: this.changeRoomSettingsIDField,
      AddToBlacklist: ATB,
      RemoveFromBlacklist: RFB
    };
    this.serverService.changeRoomSettingsRequest(msg).subscribe(
      data => {
        if (data['MessageType'] === 'Error') {
          this.errorMsgChangeRoomSettings = data['ErrorMessage'];
        } else {
          this.successMsgChangeRoomSettings = `Succesfully changed room ${this.changeRoomSettingsIDField} settings!`;
          this.rooms = this.roomService.getRooms();
        }
      },
      err => {
        alert(JSON.stringify(err));
      }
    );
  }

  // Parse blacklisted websites from HTML input
  // 'websites' is passed as a comma separated string: "youtube.com, facebook.com"
  websiteParser (websites) {

    if (websites === '') {
      return [];
    }
    // Base string from HTML
    let sitesArray = new Array();
    let sitesTrimmed = '';
    sitesTrimmed = websites.replace(/ /g, ''); // Trim whitespace
    sitesArray = sitesTrimmed.split(',');
    let i = 0;
    const prefix = 'https://';
    // Fix the formatting of the passed websites
    // console.log(sitesArray);
    for (i = 0; i < sitesArray.length; i++) {
      const first = sitesArray[i].substring(0, 7); // get first 8char substring
      if (first === prefix) { // If substring == "https://"
        // Check for www.
  //      if (second.equals)
      } else {
        const temp = sitesArray[i];
        sitesArray[i] = prefix.concat(temp);
      }
    }
    return sitesArray;
  }

    // preprocess the roomBlacklist string. Assume it to be comma separated.
    // get the string from this.changeRoomBlacklistField
    // bonus: if the user writes "google.com", change it so that it looks like
    // http://www.google.com

  // }
  /**
   * Updates the room to display for the drop down list of rooms.
   */
  sync() {
    this.rooms = this.roomService.getRooms();
  }
}
