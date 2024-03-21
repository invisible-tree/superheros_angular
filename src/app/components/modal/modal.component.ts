import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() closed: EventEmitter<any> = new EventEmitter();

  public closeModal(): void {
    this.closed.emit();
  }
}
