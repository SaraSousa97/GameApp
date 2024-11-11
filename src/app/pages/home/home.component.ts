import { Component } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  games: Array<any> = [];

  constructor(private listService: ListsService){}

  ngOnInit(){

    this.listService.getGamesList().subscribe({
      next: (data) => {
        console.log(data);
        this.games = data;
      },
      error: (error) =>{
        console.log('Algo correu mal: ', error);
      }
    });
  }
}
