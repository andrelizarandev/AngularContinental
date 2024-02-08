// Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterProgramaComponentDialog } from '../../../dialogs/submit/register-programa-dialog/register-programa.component-dialog';

// Service
import { ProgramasService } from '../../../api/programas/programas.service';

// Types
import { GetProgramaData } from '../../../api/programas/programas.types';
import { ConfirmDialogComponent, ConfirmDialogPayload } from '../../../dialogs/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-programas-screen',
  standalone: true,
  imports: [
    ButtonModule, 
    TableModule, 
    NavigationContainerComponent, 
    RegisterProgramaComponentDialog, 
    ConfirmDialogComponent,
    CardWithSkeletonComponent
  ],
  templateUrl: './programas-screen.component.html',
  styleUrl: './programas-screen.component.scss'
})

export class ProgramasScreenComponent {

  isRegisterOpen = false;
  confirmDeletePayload:ConfirmDialogPayload | null = null;
  getUserListService = inject(ProgramasService).getProgramasList().result;

  // Toggle
  toggleOpenRegister () {
    this.isRegisterOpen = !this.isRegisterOpen;
  }

  toggleOpenDelete () {
    this.confirmDeletePayload = {
      title: 'Eliminar programa',
      message: `¿Estás seguro de eliminar el programa`,
      actionLabel: 'Eliminar',
      action: () => {},
      cancelAction: () => this.confirmDeletePayload = null
    };
  }

}
