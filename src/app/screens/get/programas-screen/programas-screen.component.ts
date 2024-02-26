// Modules
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';

// Actions
import { setConfirmDialogPayloadAction, setMessageFromUiDataAction } from '../../../state/actions/ui-actions';

// Classes
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterProgramaComponentDialog } from '../../../dialogs/submit/register-programa-dialog/register-programa.component-dialog';

// Service
import { ProgramasService } from '../../../api/programas/programas.service';

// Types
import { GetProgramaData } from '../../../api/programas/programas.types';
import { ConfirmDialogComponent, ConfirmDialogPayload } from '../../../dialogs/shared/confirm-dialog/confirm-dialog.component';
import { deleteProgramaSuccessMessage } from '../../../data/data.messages';

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
  isPostRequest = true;
  isRegisterOpen = false;

  // Services
  programasService = inject(ProgramasService);

  constructor (private store:Store) {}

  getProgramasQuery = injectQuery(() => ({
    queryKey: ['get-programas'],
    queryFn: () => this.programasService.getProgramasApi()
  }));

  deleteProgramaMutation = injectMutation((client) => ({

    mutationFn: (id:number) => this.programasService.deleteProgramaApi(id),
    
    onSuccess: () => {
      client.invalidateQueries({ queryKey:['get-programas'] });
      this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload:null }));
      this.store.dispatch(setMessageFromUiDataAction({ message:deleteProgramaSuccessMessage }));
    }

  }));

  // Breadcrumb
  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.programasItem
  ];

  confirmDeletePrograma (data:GetProgramaData) {
    this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload:{
      title: 'Eliminar programa',
      message: `¿Estás seguro de eliminar el programa ${data.nombre}?`,
      actionLabel: 'Eliminar',
      action: () => this.deleteProgramaMutation.mutate(data.id),
      cancelAction: () => this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload:null }))
    }}));
  }

  // Toggle
  toggleOpenRegister (isPostRequest = true) {
    this.isPostRequest = isPostRequest;
    this.isRegisterOpen = !this.isRegisterOpen;
  }

}
