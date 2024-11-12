import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  constructor(private http: HttpClient) {}

  getGamesList(): Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:3000/gamesList');  // Replace 'api/games' with your actual endpoint
  }
}
