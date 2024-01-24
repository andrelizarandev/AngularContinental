// Modules
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterRolDialogComponent } from '../../dialogs/register-rol-dialog/register-rol-dialog.component';

// Types
import { GetRole } from '../../../api/roles/types';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [NavigationContainerComponent, TableModule, ButtonModule, RegisterRolDialogComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})

export class RolesComponent {

  isRegisterOpen = false;

  roleList:GetRole[] = [
    { id: '1', name: 'Admin', description: 'Admin' },
    { id: '2', name: 'User',  description: 'User' },
    { id: '3', name: 'Guest', description: 'Guest' },
  ]

  toggleOpenRegister() {
    this.isRegisterOpen = !this.isRegisterOpen;
  }

}
