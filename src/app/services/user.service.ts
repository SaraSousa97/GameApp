import { Injectable } from '@angular/core';
import { List, User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getGameInfo: any;

  constructor(private http: HttpClient) { }

  getUser(): Observable<User>{
    return this.http.get<User>('http://localhost:3000/profile');
  }

  getLists(): Observable<List[]>{
    return this.http.get<List[]>('http://localhost:3000/profile/:lists');
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>('http://localhost:3000/profile/', user);
  }
}


