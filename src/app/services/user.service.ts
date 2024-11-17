import { Injectable } from '@angular/core';
import { List, User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { GameInfo } from '../models/game-info';
import { switchMap } from 'rxjs';

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

  isGameInList(listId: string, gameId: string): Observable<boolean> {
    return this.getUser().pipe(
      switchMap((profile: User) => {
        const list = profile.lists.find(list => list.id === listId);
        return [!!(list && list.gamesIds.includes(gameId))];
      })
    );
  }

  moveGameBetweenLists(
    fromListId: string,
    toListId: string,
    gameId: string
  ): Observable<User> {
    return this.getUser().pipe(
      switchMap((profile: User) => {
        const fromList = profile.lists.find(list => list.id === fromListId);
        const toList = profile.lists.find(list => list.id === toListId);
  
        if (fromList && toList) {
          // Remove the game from the source list
          fromList.gamesIds = fromList.gamesIds.filter(id => id !== gameId);
  
          // Add the game to the destination list if it's not already there
          if (!toList.gamesIds.includes(gameId)) {
            toList.gamesIds.push(gameId);
          }
        }
  
        // Update the user profile
        return this.http.put<User>('http://localhost:3000/profile', profile);
      })
    );
  }
  
  
}


