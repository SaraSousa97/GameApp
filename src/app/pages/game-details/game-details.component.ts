import { Component } from '@angular/core';
import { GameInfo, ListScreenshots } from '../../models/game-info';
import { ListsService } from '../../services/lists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss'
})
export class GameDetailsComponent {

  gameInfo: GameInfo | undefined;
  user: User |undefined;


  constructor(private route: ActivatedRoute, private listsService:ListsService, private router: Router, private userServices: UserService){}

 
  ngOnInit() {
    const id= this.route.snapshot.paramMap.get('id') || '1';
    this.listsService.getGamesInfo(id).subscribe({
      next: (data) => {
        console.log(data);
        this.gameInfo = data;
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

  loadUserProfile() {
    this.userServices.getUser().subscribe(profile => {
      this.user = profile;
    });
  }

  movingGame(listId: string, gameId?: string){
    if (!gameId) {
      console.error('Game ID is undefined');
      return;
    }
  
    this.userServices.moveGame(listId, gameId).subscribe({
      next: () => this.loadUserProfile(),
      error: (error) => console.error('Erro ao adicionar jogo:', error)
    });
  }

}
