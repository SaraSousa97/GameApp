import { Injectable } from '@angular/core';
import { List, User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { GameInfo } from '../models/game-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<User>{
    return this.http.get<User>('http://localhost:3000/profile');
  }

  getGameImage(gameId: string): Observable<GameInfo> {
    return this.http.get<GameInfo>(`http://localhost:3000/games/${gameId}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>('http://localhost:3000/profile/', user);
  }
}


