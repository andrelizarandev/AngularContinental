// Modules
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterProgramaComponentDialog } from '../../dialogs/register-programa-dialog/register-programa.component-dialog';

// Types
import { GetPrograma } from '../../../api/programas/types';

@Component({
  selector: 'app-programas-screen',
  standalone: true,
  imports: [ButtonModule, TableModule, NavigationContainerComponent, RegisterProgramaComponentDialog],
  templateUrl: './programas-screen.component.html',
  styleUrl: './programas-screen.component.scss'
})

export class ProgramasScreenComponent {

  isRegisterOpen = false;

  programasList:GetPrograma[] = [
    { id: '1', nombre: 'Programa 1' },
    { id: '2', nombre: 'Programa 2' },
    { id: '3', nombre: 'Programa 3' },
    { id: '4', nombre: 'Programa 4' },
    { id: '5', nombre: 'Programa 5' },
  ];

  toggleOpenRegister () {
    this.isRegisterOpen = !this.isRegisterOpen;
  }

}
