import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GameService } from '../../services/game.service';
import { List, User } from '../../models/user';
import { GameInfo } from '../../models/game-info';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-play-later',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './play-later.component.html',
  styleUrl: './play-later.component.scss'
})
export class PlayLaterComponent implements OnInit {
  user: User | undefined;
  list: List | undefined;
  gameCache: { [gameId: string]: GameInfo } = {};

  constructor(private userService: UserService, private gameService: GameService, private snackBar: MatSnackBar ) {}

  ngOnInit() {
    this.userService.getLists().subscribe({
      next: (lists: any[]) => {
        this.list = lists.find((list: { name: string; }) => list.name === 'Play Later');
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

  loadUserProfile() {
    this.userService.getUser().subscribe(profile => {
      this.user = profile;
    });
  }

  removeGame(listId: string, gameId: string){
    //remover o jogo da lista
    this.userService.deleteGame(listId, gameId).subscribe({
      next: () => {
        this.loadUserProfile();
        if (this.list) {
          this.list.gamesIds = this.list.gamesIds.filter(id => id !== gameId);
        }

        this.snackBar.open('Game removed successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snack-bar-success']
        });
      },
      error: (error) => console.error('Erro ao remover jogo:', error)
    });
  }
}
