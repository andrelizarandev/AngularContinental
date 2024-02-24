// Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterProgramaComponentDialog } from '../../../dialogs/submit/register-programa-dialog/register-programa.component-dialog';

// Service
import { ProgramasService } from '../../../api/programas/programas.service';

// Types
import { ConfirmDialogComponent, ConfirmDialogPayload } from '../../../dialogs/shared/confirm-dialog/confirm-dialog.component';
import { MenuItem } from 'primeng/api';
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-programas-screen',
  standalone: true,
  imports: [
    ButtonModule, 
    TableModule, 
    NavigationContainerComponent, 
    RegisterProgramaComponentDialog, 
    ConfirmDialogComponent,
    CardWithSkeletonComponent,
    CustomBreadcrumbComponent
  ],
  templateUrl: './programas-screen.component.html',
  styleUrl: './programas-screen.component.scss'
})

export class ProgramasScreenComponent {

  // Vars
  isRegisterOpen = false;
  confirmDeletePayload:ConfirmDialogPayload | null = null;

  // Services
  programasService = inject(ProgramasService)

  getProgramasQuery = injectQuery(() => ({
    queryKey: ['get-programas'],
    queryFn: () => this.programasService.getProgramasApi()
  }));

  // Breadcrumb
  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.programasItem
  ];

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
