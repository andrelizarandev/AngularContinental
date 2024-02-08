// Modules
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';

// Components
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
    CardWithSkeletonComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {

  getUserListService = inject(UsersService).getUserList().result;

  constructor (private router:Router) {}

  // Redirect
  redirectToRegisterUser () {
    this.router.navigate(["/submit-user"]);
  }

}
