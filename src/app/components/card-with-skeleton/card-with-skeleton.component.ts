// Modules
import { CardModule } from 'primeng/card';
import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-card-with-skeleton',
  standalone: true,
  imports: [CardModule, SkeletonModule],
  templateUrl: './card-with-skeleton.component.html',
  styleUrl: './card-with-skeleton.component.scss'
})

export class CardWithSkeletonComponent {

  @Input() isLoading: boolean = false;

}
