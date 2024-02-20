// Modules
import { Component } from '@angular/core';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavigationContainerComponent,
    CardWithSkeletonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
