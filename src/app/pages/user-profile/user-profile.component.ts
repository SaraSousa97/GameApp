import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListsService } from '../../services/lists.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  user: User | undefined;
  gameThumbnails: { [gameId: string]: string } = {};

  @Input() username = 'Username';

  constructor(private userService:UserService, private router:Router, private listService: ListsService, private route: ActivatedRoute, private gameService: GameService){}

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (data) => {
        console.log(data);
        this.user = data;
        this.loadGameThumbnails();
      },
      error: (error) => {
        console.log('Something went wrong: ', error);
      }
    });

  }

  // Método para obter todos os gameIds
  getGameIds(): string[] {
    return this.user?.lists?.flatMap(list => list.gamesIds) || [];
  }

  // Método para carregar as thumbnails para todos os gameIds
  loadGameThumbnails() {
    this.user?.lists.forEach(list => {
      list.gamesIds.forEach(gameId => {
        this.gameService.getGameById(gameId).subscribe({
          next: (game) => {
            this.gameThumbnails[gameId] = game.thumbnail;
          },
          error: (error) => console.error('Error loading', error)
        });
      });
    });
  }

  getThumbnail(gameId: string): string {
    return this.gameThumbnails[gameId];
  }

  editProfile(){
    this.router.navigate(['update-user/:id', this.user?.id]);
  }
}
