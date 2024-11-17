import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListsService } from '../../services/lists.service';
import { GameService } from '../../services/game.service';
import { GameInfo } from '../../models/game-info';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  user: User | undefined;
  game: GameInfo[] = [];
  gameIds: string[] = [];
  gameThumbnails: { [gameId: string]: string } = {};

  @Input() username = 'Username';

  constructor(private userService:UserService, private router:Router, private listService: ListsService, private route: ActivatedRoute, private gameService: GameService, private http: HttpClient){}

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
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

  loadUserProfile() {
    this.userService.getUser().subscribe(profile => {
      this.user = profile;
    });
  }

  addGame(listId: string, gameId: string) {
    this.userService.moveGame(listId, gameId).subscribe({
      next: () => this.loadUserProfile(),
      error: (error) => console.error('Erro ao adicionar jogo:', error)
    });
  }


  removeGame(listId: string, gameId: string){
    //remover o jogo da lista
    this.userService.deleteGame(listId, gameId).subscribe({
      next: () => this.loadUserProfile(),
      error: (error) => console.error('Erro ao remover jogo:', error)
    });
  }

/*  //remove o id do jogo apenas enquanto não dermos refresh à página
    removeGameFromListInMemory(listId: string, gameId: string) {
      const list = this.user?.lists.find((l: any) => l.id === listId);
      if (list) {
        list.gamesIds = list.gamesIds.filter((id: string) => id !== gameId);
      }
    }*/

  editProfile(){
    this.router.navigate(['user-profile', this.user?.id, 'update-user']);
  }
}
