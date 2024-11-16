import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
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
  imports: [CommonModule, FormsModule]
})
export class NavbarComponent {
  @Input() user: User | undefined;
  games: Game[] = [];  // Change to an array of games, initialized as an empty array

  constructor(
    private userService: UserService, private listService:ListsService,
    private route: ActivatedRoute, private router:Router
  ) {}

  

  searchQuery: string = ''; // The search query
  filteredGames: Game[] = []; // Filtered list of games based on search query

  onSearch() {
    if (this.searchQuery.trim()) {
      // Filter the games list based on the search query
      this.filteredGames = this.games.filter((game) =>
        game.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      // Clear the filtered games if no search query
      this.filteredGames = [];
    }
  }

  onSelect(game: Game) {
    console.log('Selected game:', game);
    this.router.navigate(['/game-details', game.id]);
    // Here you can navigate to the game detail page or perform any action
    this.searchQuery = game.title; // Optionally set the search input to the selected title
    this.filteredGames = []; // Clear the suggestions
  }

  ngOnInit() {
    // Use route to get parameters, like 'id'
    const id = this.route.snapshot.paramMap.get('id') || '06c2';

    this.userService.getUser(id).subscribe({
      next: (data) => {
        console.log(data);
        this.user = data;  // Set the user after getting data
      },
      error: (error) => {
        console.log('Something went wrong: ', error);
      }

      
    });

    this.listService.getGamesList().subscribe({
      next: (data: Game[]) => {
        console.log(data);
        this.games = data;
      },
      error: (error) => {
        console.log('Something went wrong: ', error);
      }
    });

  }
}
