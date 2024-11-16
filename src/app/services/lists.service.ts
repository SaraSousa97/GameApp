import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { GameInfo, ListScreenshots } from '../models/game-info';


@Injectable({
  providedIn: 'root'
})
export class ListsService {
  constructor(private http: HttpClient) {}

  getGamesList(): Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:3000/gamesList');
  }

  getGameInfo(): Observable<GameInfo[]>{
    return this.http.get<GameInfo[]>('http://localhost:3000/gameDetails');
  }
  
  getScreenshots(): Observable<ListScreenshots[]>{
    return this.http.get<ListScreenshots[]>('http://localhost:3000/gameDetails/:screenshots');
  }
}
