import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { User } from './models/user';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Corrected `styleUrl` to `styleUrls`
})
export class AppComponent {
  title = 'GameApp';

  user: User | undefined;

  notification: string | undefined= undefined;

  constructor(private notificationService: NotificationsService) {
    // Subscribe to notifications
    this.notificationService.notification.subscribe(
      (message) => (this.notification = message)
    );
  }
}
