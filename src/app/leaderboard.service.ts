import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from './leaderboard/user.model';
import { of } from 'rxjs/observable/of';

// import { DATA } from './leaderboard/userdata';

@Injectable()
export class LeaderboardService {
  // private serviceUrl = 'http://www.teach.cs.toronto.edu/~stroudgr/scores.json';

  constructor(private http: HttpClient) { }

  // getUser(): Observable<User[]> {
  //  return this.http.get<User[]>(this.serviceUrl);
  // }

  getUser(): Observable<User[]> {
    return ; // of(DATA);
  }

}
