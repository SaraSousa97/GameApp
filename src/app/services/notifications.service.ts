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
    setTimeout(() => this.clearNotification(), 2000);
  }

  clearNotification() {
    this.notificationSubject.next(undefined);
  }
}
