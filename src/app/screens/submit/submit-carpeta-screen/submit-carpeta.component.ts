// Modules
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

@Component({
  selector: 'app-submit-carpeta',
  standalone: true,
  imports: [
    ButtonModule, 
    InputTextModule, 
    NavigationContainerComponent, 
    ReactiveFormsModule, 
    DropdownModule,
  ],
  templateUrl: './submit-carpeta.component.html',
  styleUrl: './submit-carpeta.component.scss'
})

export class SubmitCarpetaComponent {

  constructor () {}
}