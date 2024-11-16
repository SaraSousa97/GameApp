import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { List, User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { GameInfo } from '../models/game-info';
=======
import { User } from '../models/user';
import { Observable } from 'rxjs';
>>>>>>> 4760a5641a35854681a6ee83f411ef8e3bf18f4c

@Injectable({
  providedIn: 'root'
})
export class UserService {

<<<<<<< HEAD
  constructor(private http: HttpClient) { }

  getUser(): Observable<User>{
    return this.http.get<User>('http://localhost:3000/profile');
  }

  getGameImage(gameId: string): Observable<GameInfo> {
    return this.http.get<GameInfo>(`http://localhost:3000/games/${gameId}`);
  }
=======
  user: User | undefined;

  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>('http://localhost:3000/profile/'); 
  }

>>>>>>> 4760a5641a35854681a6ee83f411ef8e3bf18f4c
}


