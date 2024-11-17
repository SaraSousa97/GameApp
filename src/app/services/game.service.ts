import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameInfo } from '../models/game-info';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  // Método para obter informações do jogo pelo ID
  getGameById(gameId: string): Observable<GameInfo> {
    return this.http.get<GameInfo>(`http://localhost:3000/gameDetails/${gameId}`);
  }
}
