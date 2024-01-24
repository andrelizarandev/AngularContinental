// Modules
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

// Types
import { GetPeriodo } from '../../../api/periodos/types';
import { RegisterPeriodoDialogComponent } from '../../dialogs/register-periodo-dialog/register-periodo-dialog.component';

@Component({
  selector: 'app-periodos-screen',
  standalone: true,
  imports: [NavigationContainerComponent, TableModule, ButtonModule, RegisterPeriodoDialogComponent],
  templateUrl: './periodos-screen.component.html',
  styleUrl: './periodos-screen.component.scss'
})
export class PeriodosScreenComponent {

  isRegisterOpen: boolean = false;

  periodosList:GetPeriodo[] = [
    { id: '1', nombre: 'Periodo 1' },
    { id: '2', nombre: 'Periodo 2' },
    { id: '3', nombre: 'Periodo 3' },
    { id: '4', nombre: 'Periodo 4' },
    { id: '5', nombre: 'Periodo 5' },
  ]

  toggleOpenRegister () {
    this.isRegisterOpen = !this.isRegisterOpen;
  }

}
