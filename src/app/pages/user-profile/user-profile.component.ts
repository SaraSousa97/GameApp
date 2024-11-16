import { Component, Input } from '@angular/core';
import { List, User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GameInfo } from '../../models/game-info';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  user: User | undefined;
  //game: GameInfo | undefined;
  gameThumbnail: string | undefined;

  @Input() username = 'Username';

  constructor(private userService:UserService, private router:Router){}

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (data: User) => {
        console.log(data);
        this.user = data;
      },
      error: (error) => {
        console.log('Something went wrong: ', error);
      }
    });
  }

  editProfile(){
    this.router.navigate(['update-user/:id', this.user?.id]);
  }

  getGameThumbnail(gameId: string){
    this.userService.getGameImage(gameId).subscribe({
      next: (game: GameInfo) => {
        this.gameThumbnail = game.thumbnail;
      },
      error: (error) => {
        console.log('Error fetching game thumbnail:', error);
      },
    });
  }
}
