// Modules
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterRolDialogComponent } from '../../dialogs/register-rol-dialog/register-rol-dialog.component';

// Service
import { RolesService } from '../../api/roles/roles.service';

// Types
import { GetRoleData } from '../../api/roles/roles.types';
import { ConfirmDialogComponent, ConfirmDialogPayload } from '../../shared-dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    NavigationContainerComponent, 
    TableModule, 
    ButtonModule, 
    RegisterRolDialogComponent, 
    ConfirmDialogComponent
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})

export class RolesComponent {

  isRegisterOpen = false;

  confirmDeletePayload:ConfirmDialogPayload | null = null;

  roleList:GetRoleData[] = [
    { id: '1', name: 'Admin', description: 'Admin' },
    { id: '2', name: 'User',  description: 'User' },
    { id: '3', name: 'Guest', description: 'Guest' },
  ];

  constructor (private rolesService:RolesService) {}

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

  submitRol () {
    this.rolesService.postRol({ description:'', name:'' }).subscribe({
      next:(response) => this.onSuccessSubmitRol(response.data),
      error:() => this.onErrorSubmitRol()
    });
  }

  onSuccessSubmitRol (data:GetRoleData) {}

  onErrorSubmitRol () {}

}
