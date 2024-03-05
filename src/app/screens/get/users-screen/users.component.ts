// Modules
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
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

// Messages
import { deleteUserSuccessMessage } from '../../../data/data.messages';

// Services
import { UsersService } from '../../../api/users/users.service';

// Types
import { GetUserData } from '../../../api/users/users.types';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NavigationContainerComponent, 
    TableModule, 
    ButtonModule, 
    RegisterProgramaComponentDialog,
    CardWithSkeletonComponent,
    CustomBreadcrumbComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {

  // Injects
  userService = inject(UsersService);

  // Breadcrumbs
  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.usersItem
  ]

  constructor (private router:Router, private store:Store) {}

  // Queries
  deleteUserMutation = injectMutation((client) => ({

    mutationFn: (id:number) => this.userService.deleteUserApi(id),

    onSuccess: () => {

      this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload:null }));

      client.invalidateQueries({ queryKey: ['get-users'] });

      this.store.dispatch(setMessageFromUiDataAction({ message:deleteUserSuccessMessage }));

    }

  }));

  getUsersQuery = injectQuery(() => ({
    queryKey: ['get-users'],
    queryFn: () => this.userService.getUserApi()
  }));

  // Redirect
  redirectToRegisterUser (id:number) {
    this.router.navigate([`/submit-user/${id}`]);
  }

  // Confirm
  confirmDeleteUser (user:GetUserData) {
    this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload: {
      title:'Eliminar usuario',
      message:`¿Está seguro que desea eliminar el usuario ${user.nombres} ${user.apellidos}?`,
      action: () => this.deleteUserMutation.mutate(user.id_usuario),
      actionLabel:'Confirmar',
      cancelAction: () => this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload:null }))
    }}));
  }

}
