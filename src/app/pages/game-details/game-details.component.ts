import { Component } from '@angular/core';
import { GameInfo, ListScreenshots } from '../../models/game-info';
import { ListsService } from '../../services/lists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent {

  gameInfo: GameInfo | undefined;
  user: User | undefined;

  listsStatus: { [key: string]: boolean } = {}; // Stores whether the game is in each list
  listNames: { [key: string]: string } = {
    emif: 'Play Later',
    qepb: 'Currently Playing',
    '9ou3': 'Played',
    gypq: 'Completed'
  };

  constructor(
    private route: ActivatedRoute,
    private listsService: ListsService,
    private router: Router,
    private userServices: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '1';
    this.listsService.getGamesInfo(id).subscribe({
      next: (data) => {
        this.gameInfo = data;
        this.checkGameInLists(data.id);
      },
      error: (error) => {
        console.log('Something went wrong: ', error);
      }
    });
  }

  // TrackBy function for performance optimization
  trackByScreenshotId(index: number, screenshot: ListScreenshots): string {
    return screenshot.id;
  }

  // Add this helper function in your GameDetailsComponent class
  getListKeys(): string[] {
    return Object.keys(this.listNames);
  }


  loadUserProfile() {
    this.userServices.getUser().subscribe(profile => {
      this.user = profile;
    });
  }

  movingGame(listId: string, gameId?: string) {
    if (!gameId) {
      console.error('Game ID is undefined');
      return;
    }

    this.userServices.moveGame(listId, gameId).subscribe({
      next: () => this.loadUserProfile(),
      error: (error) => console.error('Error adding game:', error)
    });
  }

  checkGameInLists(gameId: string) {
    const listIds = Object.keys(this.listNames); // List IDs to check

    const statusObservables = listIds.map(listId =>
      this.userServices.isGameInList(listId, gameId).pipe(
        // Map the result to a status object
        map(isInList => ({ listId, isInList }))
      )
    );

    forkJoin(statusObservables).subscribe(results => {
      results.forEach(result => {
        this.listsStatus[result.listId] = result.isInList;
      });
    });
  }
}
