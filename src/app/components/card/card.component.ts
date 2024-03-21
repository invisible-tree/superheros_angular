import { Component, Input } from '@angular/core';
import { faDumbbell, faShieldHalved, faSkull } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public faDumbbell = faDumbbell;
  public faShieldHalved = faShieldHalved;
  public faSkull = faSkull;
  @Input() name!: string;
  @Input() description!: string;
  @Input() picture_url!: string;
  @Input() force_level!: number;
  @Input() defense_level!: number;
  @Input() main_skill!: number;
}
