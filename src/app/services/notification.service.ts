import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject: Subject<any> = new Subject<any>();
  notification$: Observable<any> = this.notificationSubject.asObservable();

  public setNotification(text: string): void {
    this.notificationSubject.next(text);
  }
}
