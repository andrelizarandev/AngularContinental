// Modules
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

// Classes
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterProgramaComponentDialog } from '../../../dialogs/submit/register-programa-dialog/register-programa.component-dialog';

// Services
import { UsersService } from '../../../api/users/users.service';

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

  userService = inject(UsersService);

  getUsersQuery = injectQuery(() => ({
    queryKey: ['get-users'],
    queryFn: () => this.userService.getUserApi()
  }));

  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.usersItem
  ]

  constructor (private router:Router) {}

  // Redirect
  redirectToRegisterUser () {
    this.router.navigate(["/submit-user"]);
  }

}
