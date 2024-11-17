import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Game } from '../models/game';
import { ListsService } from '../services/lists.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule]
})
export class NavbarComponent {
  @Input() user: User | undefined;
  games: Game[] = [];  

  constructor(
    private userService: UserService, private listService:ListsService,
    private route: ActivatedRoute, private router:Router
  ) {}

  goToProfile(){
    this.router.navigate(['user-profile', this.user?.id]);
  }

  

  searchQuery: string = '';
  filteredGames: Game[] = []; 

  onSearch() {
    if (this.searchQuery.trim()) {
      this.filteredGames = this.games.filter((game) =>
        game.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredGames = [];
    }
  }

  onSelect(game: Game) {
    this.router.navigate(['/game-details', game.id]);
    this.searchQuery = game.title;
    this.filteredGames = [];
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '06c2';

    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.log('Something went wrong: ', error);
      }

      
    });

    this.listService.getGamesList().subscribe({
      next: (data: Game[]) => {
        this.games = data;
      },
      error: (error) => {
        console.log('Something went wrong: ', error);
      }
    });
  }
}
