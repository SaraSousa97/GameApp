import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationSubject= new BehaviorSubject <string | undefined>(undefined);
  notification=this.notificationSubject.asObservable();

  constructor() { }

  showNotification(message: string) {
    this.notificationSubject.next(message);
    // Clear the notification after a timeout (optional)
    setTimeout(() => this.clearNotification(), 2000); // 3 seconds
  }

  clearNotification() {
    this.notificationSubject.next(undefined);
  }
}
