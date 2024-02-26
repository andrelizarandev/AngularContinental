// Modules
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterRolDialogComponent } from '../../../dialogs/submit/register-rol-dialog/register-rol-dialog.component';

// Service
import { RolesService } from '../../../api/roles/roles.service';

// Types
import { GetRoleData } from '../../../api/roles/roles.types';
import { ConfirmDialogComponent, ConfirmDialogPayload } from '../../../dialogs/shared/confirm-dialog/confirm-dialog.component';
import { MenuItem } from 'primeng/api';
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    NavigationContainerComponent, 
    TableModule, 
    ButtonModule, 
    RegisterRolDialogComponent, 
    ConfirmDialogComponent,
    CardWithSkeletonComponent,
    CustomBreadcrumbComponent
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})

export class RolesComponent {

  // Vars
  isRegisterOpen = false;

  confirmDeletePayload:ConfirmDialogPayload | null = null;

  roleList:GetRoleData[] = [
    { id: '1', name: 'Admin', description: 'Admin' },
    { id: '2', name: 'User',  description: 'User' },
    { id: '3', name: 'Guest', description: 'Guest' },
  ];

  // Breadcumb
  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.rolesItem
  ]

  getRolesQuery = injectQuery(() => ({
    queryKey: ['get-roles'],
    queryFn: () => this.rolesService.getRolApi()
  }))

  constructor (private rolesService:RolesService) {}

  // Toggle
  toggleOpenRegister() {
    this.isRegisterOpen = !this.isRegisterOpen;
  }

  toggleOpenDeleteConfirm () {
    this.confirmDeletePayload = {
      title: 'Eliminar programa',
      message: `¿Estás seguro de eliminar el rol`,
      actionLabel: 'Eliminar',
      action: () => {},
      cancelAction: () => this.confirmDeletePayload = null
    };
  }

  // Submit
  submitRol () {
    
  }

  // On Success
  onSuccessSubmitRol (data:GetRoleData) {}

  // On Error
  onErrorSubmitRol () {}

}
