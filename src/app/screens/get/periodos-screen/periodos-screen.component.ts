// Modules
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterPeriodoDialogComponent } from '../../../dialogs/submit/register-periodo-dialog/register-periodo-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogPayload } from '../../../dialogs/shared/confirm-dialog/confirm-dialog.component';

// Service
import { PeriodoService } from '../../../api/periodo/periodo.service';

// Types
import { GetPeriodoData } from '../../../api/periodo/periodo.types';
import { ProgramasService } from '../../../api/programas/programas.service';

@Component({
  selector: 'app-periodos-screen',
  standalone: true,
  imports: [
    NavigationContainerComponent, 
    TableModule, 
    ButtonModule, 
    RegisterPeriodoDialogComponent, 
    ConfirmDialogComponent,
    CardWithSkeletonComponent
  ],
  templateUrl: './periodos-screen.component.html',
  styleUrl: './periodos-screen.component.scss'
})
export class PeriodosScreenComponent {

  isRegisterOpen: boolean = false;
  confirmDeletePayload:ConfirmDialogPayload | null = null
  periodoListService = inject(ProgramasService).getProgramasList().result;

  // Toggle
  toggleOpenRegister () {
    this.isRegisterOpen = !this.isRegisterOpen;
  }
  
  toggleOpenDelete () {
    this.confirmDeletePayload = {
      title: 'Eliminar periodo',
      message: `¿Estás seguro de eliminar el periodo`,
      actionLabel: 'Eliminar',
      action: () => {},
      cancelAction: () => this.confirmDeletePayload = null
    };
  }

}
