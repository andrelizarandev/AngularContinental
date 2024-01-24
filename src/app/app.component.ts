// Modules
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Screens
import { LoginComponent } from './screens/login/login.component';
import { UsersComponent } from './screens/users/users.component';
import { RolesComponent } from './screens/roles/roles.component';
import { PeriodosScreenComponent } from './screens/periodos-screen/periodos-screen.component';
import { ProgramasScreenComponent } from './screens/programas-screen/programas-screen.component';
import { SubmitUserScreenComponent } from './submit-screens/submit-user-screen/submit-user-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, UsersComponent, RolesComponent, SubmitUserScreenComponent, ProgramasScreenComponent, PeriodosScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'angular-continental';
}
