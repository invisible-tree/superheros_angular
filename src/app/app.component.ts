import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './services/loader.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private subs: Subscription[] = [];

  constructor(
    public loaderService: LoaderService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initNotifications();
    this.setLoader();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  private setLoader(): void {
    this.loaderService.isLoading = true;
    setTimeout(() => {
      this.loaderService.isLoading = false;
    }, 1500);
  }

  private initNotifications(): void {
    this.subs.push(
      this.notificationService.notification$.subscribe((resp) => {
        this.snackBar.open(resp, 'Cerrar', {
          duration: 3000,
        });
      })
    );
  }
}
