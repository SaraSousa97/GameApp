import { Component, Input } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { Game } from '../../models/game';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() meuNome='Carol';

  games: Array<Game> = [];

  constructor(private listsService:ListsService){}


 
  ngOnInit() {
    this.listsService.getGamesList().subscribe({
      next: (data: Game[]) => {
        console.log(data);
        this.games = data;
      },
      error: (error) => {
        console.log('Something went wrong: ', error);
      }
    });


  }

  searchQuery: string = '';

  get filteredGames(): Game[] {
    return this.games.filter(game => 
      game.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  trackById(index: number, game: Game): string {
    return game.id;
  }
  
}
