import { Injectable } from '@angular/core';
import { List, User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { GameInfo } from '../models/game-info';
import { map, switchMap } from 'rxjs';

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
    return this.http.get<List[]>('http://localhost:3000/profile')
    .pipe(
      map((profile: any) => profile.lists)
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>('http://localhost:3000/profile/', user);
  }

  // Adicionar um jogo à lista
  moveGame(listId: string, gameId: string): Observable<User> {
    return this.getUser().pipe(
      switchMap((profile: User) => {
        const list = profile.lists.find(list => list.id === listId);
        if (list && !list.gamesIds.includes(gameId)) {
          list.gamesIds.push(gameId);
        }
        return this.http.put<User>('http://localhost:3000/profile', profile);
      })
    );
  }

 
  // Remover um jogo da lista
  deleteGame(listId: string, gameId: string): Observable<any> {
    return this.getUser().pipe(
      switchMap((profile: User) => {
        const list = profile.lists.find(list => list.id === listId);
        if (list) {
          list.gamesIds = list.gamesIds.filter(id => id !== gameId);
        }
        return this.http.put<User>('http://localhost:3000/profile', profile);
      })
    );
  }
}


