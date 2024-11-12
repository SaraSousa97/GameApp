import { Component, Input } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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
  
}
