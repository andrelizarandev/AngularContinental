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
import { RegisterRolDialogComponent } from '../../../dialogs/submit/register-rol-dialog/register-rol-dialog.component';

// Messages
import { deleteRolSuccessMessage } from '../../../data/data.messages';

// Service
import { RolesService } from '../../../api/roles/roles.service';

// Types
import { GetRoleData } from '../../../api/roles/roles.types';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    NavigationContainerComponent, 
    TableModule, 
    ButtonModule, 
    RegisterRolDialogComponent, 
    CardWithSkeletonComponent,
    CustomBreadcrumbComponent
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})

export class RolesComponent {

  // Injects
  rolesService = inject(RolesService);

  // Vars
  isPostRequest = true;
  isRegisterOpen = false;
  selectedRol:GetRoleData | null = null;

  // Breadcumb
  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.rolesItem
  ]

  getRolesQuery = injectQuery(() => ({
    queryKey: ['get-roles'],
    queryFn: () => this.rolesService.getRolesApi()
  }));

  deleteRolMutation = injectMutation((client) => ({

    mutationFn: (id:number) => this.rolesService.deleteRolApi(id),

    onSuccess: () => {
      this.store.dispatch(setMessageFromUiDataAction({ message:deleteRolSuccessMessage }));
      this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload:null }));
      client.invalidateQueries({ queryKey:['get-roles'] });
    }

  }));

  constructor (private store:Store) {}

  // Toggle
  toggleOpenRegister(isPostRequest = true, selectedRol:GetRoleData | null = null) {
    this.isPostRequest = isPostRequest;
    this.selectedRol = selectedRol;
    this.isRegisterOpen = !this.isRegisterOpen;
  }

  // Confirm
  confirmDeleteRol (data:GetRoleData) {
    this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload: {
      title:'Eliminar Rol',
      message:`¿Estás seguro que deseas eliminar el rol ${data.nombre}?`,
      action: () => this.deleteRolMutation.mutate(Number(data.id)),
      actionLabel:'Eliminar',
      cancelAction: () => this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload:null }))
    }}));
  }

  // Submit
  submitRol () {
    
  }

}
