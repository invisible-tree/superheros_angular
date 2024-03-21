import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HerosService } from '../../services/heros.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  public filteredHerosData: any;
  public value!: string;
  public deleteModalIsOpen: boolean = false;
  private selectedId!: number;
  private subs: Subscription[] = [];

  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(
    public herosService: HerosService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.herosService.herosData$.subscribe((data) => {
        this.filteredHerosData = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public onEdit(id: number): void {
    this.router.navigate(['/edit'], { queryParams: { id } });
  }

  public onDelete(id: number): void {
    this.selectedId = id;
    this.deleteModalIsOpen = true;
  }

  public onKeyup(searchStr: string) {
    if (searchStr?.length > 2) {
      this.filteredHerosData = this.herosService.herosData.filter(
        (el: { name: string }) =>
          el.name.toLowerCase().includes(searchStr.toLowerCase())
      );
    } else {
      this.filteredHerosData = this.herosService.herosData;
    }
  }

  public closeModal(isDelete: boolean = false): void {
    this.deleteModalIsOpen = false;
    if (!isDelete) {
      return;
    }
    this.herosService.deleteHero(this.selectedId);
    this.notificationService.setNotification(
      'Se ha eliminado el superhéroe correctamente'
    );
  }
}
