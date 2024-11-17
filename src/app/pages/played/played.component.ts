import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GameService } from '../../services/game.service';
import { List, User } from '../../models/user';
import { GameInfo } from '../../models/game-info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-played',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './played.component.html',
  styleUrls: ['./played.component.scss'],
})
export class PlayedComponent {
  list: List | undefined;
  gameCache: { [gameId: string]: GameInfo } = {};

  constructor(private userService: UserService, private gameService: GameService) {}

  ngOnInit() {
    this.userService.getLists().subscribe({
      next: (lists: any[]) => {
        this.list = lists.find((list: { name: string; }) => list.name === 'Played');
        this.preloadGameInfo();
      },
      error: (error: any) => console.error('Erro ao carregar lista:', error)
    });
  }

  preloadGameInfo() {
    const gameIds = this.list?.gamesIds || [];
    gameIds.forEach(gameId => {
      this.gameService.getGameById(gameId).subscribe(game => {
        this.gameCache[gameId] = game;
      });
    });
  }

  getGameThumbnail(gameId: string): string | undefined {
    return this.gameCache[gameId]?.thumbnail;
  }

  getGameName(gameId: string): string {

    return this.gameCache[gameId]?.title || 'Unknown Game';
  }
}
