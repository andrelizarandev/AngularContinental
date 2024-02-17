// Modules
import { MenuItem } from 'primeng/api';
import { Component, Input } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';

// Components
import { CardWithSkeletonComponent } from '../card-with-skeleton/card-with-skeleton.component';

@Component({
  selector: 'app-custom-breadcrumb',
  standalone: true,
  imports: [
    BreadcrumbModule,
    CardWithSkeletonComponent,
  ],
  templateUrl: './custom-breadcrumb.component.html',
  styleUrl: './custom-breadcrumb.component.scss'
})
export class CustomBreadcrumbComponent {

  @Input() items:MenuItem[] = [];

  currentRoute:MenuItem | null = null;

  ngOnInit() {
    this.currentRoute = this.items[this.items.length - 1];
  }

}
