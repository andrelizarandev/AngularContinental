// Modules
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

@Component({
  selector: 'app-submit-user-screen',
  standalone: true,
  imports: [ButtonModule, InputTextModule, NavigationContainerComponent],
  templateUrl: './submit-user-screen.component.html',
  styleUrl: './submit-user-screen.component.scss'
})
export class SubmitUserScreenComponent {

}
