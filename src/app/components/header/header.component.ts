import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() showButtons: boolean = true;
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  public onKeyup(searchStr: string): void {
    this.onSearch.emit(searchStr);
  }
}
