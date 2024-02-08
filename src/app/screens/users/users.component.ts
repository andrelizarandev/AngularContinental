// Modules
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterProgramaComponentDialog } from '../../dialogs/register-programa-dialog/register-programa.component-dialog';

// Services
import { UsersService } from '../../api/users/users.service';

// Types
import { GetUser } from '../../api/login/login.types';
import { GetUserData } from '../../api/users/users.types';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavigationContainerComponent, TableModule, ButtonModule, RegisterProgramaComponentDialog],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {

  userList:GetUserData[] = [];

  constructor (
    private router:Router,
    private usersService:UsersService
  ) {}

  ngOnInit () {
    this.getUserList();
  }

  // Redirect
  redirectToRegisterUser () {
    this.router.navigate(["/submit-user"]);
  }

  // Get
  getUserList () {
    this.usersService.getUserList().subscribe({
      next: (response) => this.onSuccessGetUserList(response),
      error: (error) => console.error(error)
    });
  }

  // Get
  onSuccessGetUserList (data:GetUserData[]) {
    this.userList = data;
  }

}
