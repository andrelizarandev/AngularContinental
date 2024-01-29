// Modules
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterProgramaComponentDialog } from '../../dialogs/register-programa-dialog/register-programa.component-dialog';

// Types
import { GetUser } from '../../api/login/login.types';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavigationContainerComponent, TableModule, ButtonModule, RegisterProgramaComponentDialog],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {

  constructor (private router:Router) {}

  redirectToRegisterUser () {
    this.router.navigate(["/submit-user"]);
  }

  userList:GetUser[] = [
    { id: "1", nombre: "Juan", apellido: "Perez", correo: "" },
    { id: "2", nombre: "Maria", apellido: "Perez", correo: "" },
    { id: "3", nombre: "Jose", apellido: "Perez", correo: "" },
    { id: "4", nombre: "Pedro", apellido: "Perez", correo: "" },
    { id: "5", nombre: "Luis", apellido: "Perez", correo: "" },
    { id: "6", nombre: "Carlos", apellido: "Perez", correo: "" },
  ];

}
