import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { UserService } from '../../services/user.service';
import { ListsService } from '../../services/lists.service';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { List } from '../../models/user';

@Component({
  selector: 'app-played',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './played.component.html',
  styleUrls: ['./played.component.scss'], // Fixed plural typo in styleUrls
})
export class PlayedComponent {
  playedGames: Game[] | undefined = [];
  allGames: Game[] |undefined = [];
  playedListId: string = '9ou3'; // Directly set the "Played" list ID

  constructor(private userService: UserService, private listService: ListsService) {}

  ngOnInit(): void {
    this.fetchPlayedGames();
    this.fetchAllGames();
  }

  fetchPlayedGames(): void {
    this.userService.getList(this.playedListId).subscribe(list => {
      if (list) {
        const gameRequests = list.gamesIds.map(id => this.userService.getGameInfo(id));
        forkJoin(gameRequests).subscribe(games => {
          this.playedGames = games; // Set fetched games
        });
      }
    });
  }

  fetchAllGames(): void {
    this.listService.getGamesList().subscribe(games => {
      this.allGames = games;
    });
  }

  addGameToPlayed(gameId: string): void {
    this.userService.moveGame(this.playedListId, gameId).subscribe(() => {
      this.fetchPlayedGames(); // Refresh the played games list
    });
  }

  deleteGameFromPlayed(gameId: string): void {
    this.userService.deleteGame(this.playedListId, gameId).subscribe(() => {
      this.fetchPlayedGames(); // Refresh the played games list
    });
  }
}
