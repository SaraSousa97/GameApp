import { Component } from '@angular/core';
import { GameInfo, ListScreenshots } from '../../models/game-info';
import { ListsService } from '../../services/lists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss'
})
export class GameDetailsComponent {

  gameInfo: GameInfo | undefined;


  constructor(private route: ActivatedRoute, private listsService:ListsService, private router: Router){}


 
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

}
