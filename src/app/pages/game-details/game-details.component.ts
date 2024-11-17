import { Component } from '@angular/core';
import { GameInfo, ListScreenshots } from '../../models/game-info';
import { ListsService } from '../../services/lists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { forkJoin, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; 

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

  listsStatus: { [key: string]: boolean } = {};
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
    private userServices: UserService,
    private snackBar: MatSnackBar
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

  trackByScreenshotId(index: number, screenshot: ListScreenshots): string {
    return screenshot.id;
  }

  getListKeys(): string[] {
    return Object.keys(this.listNames);
  }

  loadUserProfile() {
    this.userServices.getUser().subscribe(profile => {
      this.user = profile;
    });
  }

  movingGame(targetListId: string, gameId?: string) {
    if (!gameId) {
      console.error('Game ID is undefined');
      return;
    }

    const currentListId = this.getCurrentList(gameId);

    if (currentListId) {
      this.userServices.moveGameBetweenLists(currentListId, targetListId, gameId).subscribe({
        next: () => {
          this.checkGameInLists(gameId);
          this.snackBar.open('Game moved successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snack-bar-success'],
            horizontalPosition: 'start',  // Options: 'start', 'center', 'end'
            verticalPosition: 'top'     // Options: 'top', 'bottom'
          });
        },
        error: (error) => console.error('Error moving game:', error)
      });
    } else {
      this.userServices.addGameToList(targetListId, gameId).subscribe({
        next: () => {                   
          this.checkGameInLists(gameId);
          this.snackBar.open('Game added successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snack-bar-success'],
            horizontalPosition: 'start',  // Options: 'start', 'center', 'end'
            verticalPosition: 'top'     // Options: 'top', 'bottom'
          });
          this.checkGameInLists(gameId);
         
        },
        error: (error) => console.error('Error adding game:', error)
      });
    }
  }

  getCurrentList(gameId: string): string | null {
    for (let listId in this.listsStatus) {
      if (this.listsStatus[listId] && this.listsStatus.hasOwnProperty(listId)) {
        return listId;
      }
    }
    return null;
  }

  checkGameInLists(gameId: string) {
    const listIds = Object.keys(this.listNames);

    const statusObservables = listIds.map(listId =>
      this.userServices.isGameInList(listId, gameId).pipe(
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
