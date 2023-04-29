import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimetrackerService } from './timetracker.service';
import { RoomService  } from './room.service';
import { SlackerService } from './slacker.service';
import { Room } from './room';
const httpOptions = {
  headers: new HttpHeaders({ })
};

@Injectable()
export class ServerService {
  serverUrl = 'http://100.64.196.129:9999'; // 'http://localhost:9999';
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private timetrackerService: TimetrackerService,
    private roomService: RoomService,
    private slackerService: SlackerService
  ) { }

  /*
  === Create Room ===
  This message is to be sent when the user intends to create a brand-new room. It
  requires them to submit a userid/username, and will return their room id.

  The send message is formatted as follows:
    {
      "MessageType":"CreateRoomRequest",
      "UserName":<user's name>,                                           # string
      "RoomName":<room name>						# string
    }

  The response message is formatted as follows:
    {
      "MessageType":"CreateRoomResponse",
      "RoomId":<room id>                                                  # string
    }
  */

  createRoomRequest(msg: any): Observable<Object> {
    // this.sendDataRequestToAllRooms();
    // console.log('creatingRooms!');
    // console.log('createRoomRequest: ', JSON.stringify(msg));
    const ob = this.http.post(this.serverUrl, '\f' + JSON.stringify(msg) + '\f', httpOptions);
    console.log('createRoomRequest observer: ', ob.map((res: Response) => console.log(res.json())));
    return ob;
  }

  /**
   * === Join Room ===
    This message is sent when a user tries to join an existing room. Note that if
    the user gives a name already in the given room, we will return an error. After
    sending this message, the client ought to send messages requesting room data.

    The send message is formatted as follows:
      {
        "MessageType":"JoinRoomRequest",
        "RoomId":<room id>,                                                 # string
        "UserName":<user's name>                                              # string
      }

    The response message is formatted as follows:
      {
        "MessageType":"JoinRoomResponse"
      }
   */

  joinRoomRequest(msg: any): Observable<Object> {
    return this.http.post(this.serverUrl, '\f' + JSON.stringify(msg) + '\f', httpOptions);
  }

  /**
   * === Send Browsing Data ===
    This message is sent periodically to give the user's data for scoring.

    The send message is formatted as follows:
      {
        "MessageType":"SendDataRequest",
        "RoomId":<room id>,                                                 # string
        "UserId":<user's name>,                                             # string
        "History": [ [<website>,<time>], ...],      # list of website strings
                                                    # paired with time spent (int?)
        "LastSubmitTime":<time stamp>                 # last time the user submitted
      }

    The response message is formatted as follows:
      {
        "MessageType":"SendDataResponse"
      }
   */
  sendDataRequest(msg): Observable<Object> {
    return this.http.post(this.serverUrl, '\f' + JSON.stringify(msg) + '\f', httpOptions);
  }

  sendDataRequestToAllRooms(): void {

    const allRooms = this.roomService.getRooms();
    // let room;
    // console.log('allRooms: ', allRooms);
    for (const room in allRooms) {
      if (room) {
        // console.log('currRoom: ', room);
        // console.log('currRoomId: ', typeof(room));
        console.log('sendDataToAllRooms', {
          MessageType: 'SendDataRequest',
          RoomId: allRooms[room].id.toString(),
          UserId: this.slackerService.getSlackerName(allRooms[room].id),
          History: this.timetrackerService.getTrackingDataAsListForScores(),
          LastSubmitTime: Date.now()
        });
        this.sendDataRequest({
          MessageType: 'SendDataRequest',
          RoomId: allRooms[room].id.toString(),
          UserId: this.slackerService.getSlackerName(allRooms[room].id),
          History: this.timetrackerService.getTrackingDataAsListForScores(),
          LastSubmitTime: Date.now().toString()
        }).subscribe(
          // res => {console.log(res); },
          err => console.log('sendDataRequestToAllRooms Error: ', err)
        );
      }
    }
  }

  /**
   * === Get Leaderboard Data ===
    This message is sent periodically to get the room's scores.

    The send message is formatted as follows:
      {
        "MessageType":"GetLeaderboardRequest",
        "RoomId":<room id>                                                  # string
      }

    The response message is formatted as follows:
      {
        "MessageType":"GetLeaderboardResponse",
        "LastDay": [ [<user name>, <score>], ...],    # All a list of username-score
        "LastWeek": [ [<user name>, <score>], ...],   # pairs, sorted in order of
        "LastMonth": [ [<user name>, <score>], ...]   # best or worst score for the
                                                      # period.
      }
   */
  getLeaderboardRequest(roomId: number): Observable<Object> {
    const msg = {
      MessageType: 'GetLeaderboardRequest',
      RoomId: roomId.toString()
    };

    return this.http.post(this.serverUrl, '\f' + JSON.stringify(msg) + '\f', httpOptions);
  }

  /**
   * === Change Room Settings ===
    This message is sent when the user intends to change some parameter of an
    existing room.

    The send message is formatted as follows:
      {
        "MessageType":"ChangeRoomSettingsRequest",
        "RoomId":<room id>,                                                 # string
        "AddToBlacklist": [<website>, ...],  # list of website strings
        "RemoveFromBlacklist": [<website>, ...],  # list of website strings
      }

    The response message is formatted as follows:
      {
        "MessageType":"ChangeRoomSettingsResponse"
      }
   */
  changeRoomSettingsRequest(msg: any): Observable<Object> {
    return this.http.post(this.serverUrl, '\f' + JSON.stringify(msg) + '\f', httpOptions);
  }

  /**
   * === Get Room Settings ===
    This message is sent when the user needs an updated set of rules for their room.

    The send message is formatted as follows:
      {
        "MessageType":"GetRoomSettingsRequest",
        "RoomId":<room id>                                                  # string
      }

    The response message is formatted as follows:
      {
        "MessageType":"GetRoomSettingsResponse",
        "WebsiteSettings": [<website>:<weight>, ...],      # list of website strings
                                                          # mapped to weights
        "Users": [<user name>, ...]                        # list of user names
      }
   */
  getRoomSettingsRequest(roomId: number): Observable<Object> {
    const msg = {
      MessageType: 'GetRoomSettingsRequest',
      RoomId: roomId.toString()
    };
    console.log('getRoomSettingsRequest: The input roomId: ', roomId);
    return this.http.post(this.serverUrl, '\f' + JSON.stringify(msg) + '\f', httpOptions);
  }

  /**
   * Add a new room to the local data storage file
   */
  addNewRoomToLocal(roomId: number, roomName: string): Room {
    const newRoom: Room = {
      id: roomId,
      name: roomName,
      member_ids: [],
      blacklist: [],
      scores: []
    };
    // Add the room to the localStorage
    const localRooms = JSON.parse(localStorage.slackerRooms);
    localRooms.push(newRoom);
    localStorage.slackerRooms = JSON.stringify(localRooms);
    console.log('addNewRoomToLocal: ', localStorage.slackerRooms);

    return newRoom;
  }

  addRoomIdToNameToLocal(roomId: number, slackerId: string): void {
    // map the name to the room id in localStorage
    const localRoomIdToNameObj = JSON.parse(localStorage.slackerRoomIdToName);
    localRoomIdToNameObj[roomId.toString()] = slackerId;
    localStorage.slackerRoomIdToName = JSON.stringify(localRoomIdToNameObj);
    console.log('addRoomIdToNameToLocal: ', localStorage.slackerRoomIdToName);
  }

  /**
   * Update room members and blacklist for a room.
   */
  updateRoomMembersAndBlacklist(roomId: number): void {
    this.getRoomSettingsRequest(roomId).subscribe(
      res => {
        // console.log('updateRoomMembersAndBlacklist: ', localStorage.slackerRooms);
        if (res) {
          if (res['MessageType'] !== 'Error') {
            const localRooms: Room[] = JSON.parse(localStorage.slackerRooms);
            const updatedRoom: Room = localRooms.find(room => room.id === roomId);
            const index = localRooms.indexOf(updatedRoom);
            if (index > -1) {
              updatedRoom['blacklist'] = res['WebsiteSettings'];
              updatedRoom['member_ids'] = res['Users'];
              localRooms.splice(index, 1, updatedRoom);
              localStorage.slackerRooms = JSON.stringify(localRooms);
            }
            console.log('getRoomSettingsRequest Response: ', res);
          } else {
            console.log('getRoomSettingsRequest Error Message: ', res);
          }
          console.log('updateRoomMembersAndBlacklist roomService.getRooms(): ', this.roomService.getRooms());
        } else {
          console.log('getRoomSettingsRequest returned null for room id: ', roomId);
        }
      },
      err => console.log(err)
    );
  }

   /**
    * Update a room's scores
    */
  updateRoomScores(roomId: number): void {
    this.getLeaderboardRequest(roomId).subscribe(
      res => {
        if (res) {
          if (res['MessageType'] !== 'Error') {
            const localRooms: Room[] = JSON.parse(localStorage.slackerRooms);
            const updatedRoom = localRooms.find(room => room.id === roomId);
            const index = localRooms.indexOf(updatedRoom);
            if (index > -1) {
              updatedRoom['scores'] =
                [{'LastDay' : res['LastDay']},
                {'LastWeek' : res['LastWeek']},
                {'LastMonth' : res['LastMonth']}];
              localRooms.splice(index, 1, updatedRoom);
              localStorage.slackerRooms = JSON.stringify(localRooms);
              // console.log('updateRoomScores after splicing:', JSON.stringify(localRooms));
            }
          } else {
            console.log('updateRoomScores Error Message', res);
          }
        } else {
          console.log('getLeaderboardRequest returned null: ', roomId);
        }
      },
      err => console.log(err)
    );
  }

}
