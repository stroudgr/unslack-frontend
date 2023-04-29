import { Injectable } from '@angular/core';

import { Room } from './room';
// import { ROOMS } from './mock-rooms';

// need this for HttpClient.get
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';

@Injectable()
export class RoomService {
  timeDisplayFormatEnum = {
    PRETTY: 0,
    MINUTES: 1
  };

  constructor(
    private messageService: MessageService
  ) {
  }

  /* Return an array of Room that the user has enrolled in.
  */
  getRooms(): Room[] {
    this.messageService.add('RoomService: fetched rooms');
    console.log('localStorage.slackerRooms: ', localStorage.slackerRooms);
    return JSON.parse(localStorage.slackerRooms);
  }

  /* Return the names of the rooms the user has enrolled in.
  */
  getRoomNameList(): string[] {
    const roomNames = [];
    const roomlist = this.getRooms();
    for (const room of roomlist) {
      if (room) {
        roomNames.push(room.name);
      }
    }
    return roomNames;
  }

  /* Return a specific Room given a room id.
  */
  getRoom(id: number): Room {
    // Todo: send the message _after_ fetching the room
    this.log(`fetched room id=${id}`);
    return this.getRooms().find(room => room.id === id);
  }

  /* Log a SlackerService message with the MessageService */
  private log(message: string) {
    this.messageService.add('RoomService: ' + message);
  }


// =============================================================Future
  /*
  getRooms(): Observable<Room[]> {
    this.messageService.add('RoomService: fetched rooms');
    return of(ROOMS);
  }

  getRoom(id: number): ObservableRoom> {
    // Todo: send the message _after_ fetching the room
    this.messageService.add(`roomService: fetched room id=${id}`);
    return of(ROOMS.find(room => room.id === id));
  }*/



/*
RoomServices provides an HTTP service interface with a server.
Allows for other services and components to access room data from the server.
Also updates the room statistics in the server for a given user and room.

functions:

server requests
createRoom(userSettings:number[]): Observable<Room>
joinRoom(userId:number, roomId:number): Observable<Room>
postUserWebUsage(roomId:number): Observable<Room>

From these 3 server requests, we can get updated information about
a single room.

services and components
updateLocalRoom(localRoom:Observable<Room>): void
updateRemoteRoom(remoteRoom:Observable<Room>): void

The former is to update the local data file for a given room, whereas the
latter is to update the remote data file in the server, which may happen
in a cycles of minutes, hours, or days.

getLocalRoomData(roomId:number): Room


*/

/*import { Injectable } from '@angular/core';
import { Slacker } from './slacker';
import { Room } from './room';
// need this for HttpClient.get
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
// error operators
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RoomService {
  private roomsUrl = 'api/rooms' // where the slacker information is
  constructor(
    private MessageService,
    private http: HttpClient
  ) { }*/

  /* Requests an Array of Slackers from a server.
  */
  /*getRooms(): Observable<Slacker[]> {
    this.messageService.add('SlackerService: fetched slackers');
    return this.http.get<Slacker[]>(this.slackersUrl)
      .pipe(
        tap(slackers => this.log(`fetched slackers`)),
        catchError(this.handleError('getHeroes, []'))
      );
  }*/

  /*getSlacker(id: number): Observable<Slacker> {
    // Todo: send the message _after_ fetching the slacker
    this.messageService.add(`slackerService: fetched slacker id=${id}`);
    // local file version
    // return of(SLACKERS.find(slacker => slacker.id === id));

    // http version
    const url = `${this.slackersUrl}/${id}`;
    return this.http.get<Slacker>(url).pipe(
      tap(_ => this.log(`fetched slacker id=${id}`)),
      catchError(this.handleError<Slacker>(`getSlacker id=${id}`))
    );
  }*/

  /** PUT: update the hero on the server */
  /*updateSlacker (slacker: Slacker): Observable<any> {
    return this.http.put(this.slackersUrl, slacker, httpOptions).pipe(
      tap(_ => this.log(`updated slacker id=${slacker.id}`)),
      catchError(this.handleError<any>('updateSlacker'))
    );
  }*/

  /** Log a SlackerService message with the MessageService */
  /*private log(message: string) {
    this.messageService.add('SlackerService: ' + message);
  }*/

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  /*private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };*/

}
