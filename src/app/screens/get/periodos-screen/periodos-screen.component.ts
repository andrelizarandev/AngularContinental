// Modules
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';

// Classes
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Dialogs
import { ConfirmDialogComponent, ConfirmDialogPayload } from '../../../dialogs/shared/confirm-dialog/confirm-dialog.component';
import { RegisterPeriodoDialogComponent } from '../../../dialogs/submit/register-periodo-dialog/register-periodo-dialog.component';

// Types
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
    CardWithSkeletonComponent,
    CustomBreadcrumbComponent
  ],
  templateUrl: './periodos-screen.component.html',
  styleUrl: './periodos-screen.component.scss'
})
export class PeriodosScreenComponent {

  isRegisterOpen: boolean = false;
  confirmDeletePayload:ConfirmDialogPayload | null = null
  periodoListService = inject(ProgramasService).getProgramasList().result;

  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.periodosItem
  ]

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
