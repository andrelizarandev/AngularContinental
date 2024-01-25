// Modules
import { Routes } from '@angular/router';

// Screens
import { LoginComponent } from './screens/login/login.component';
import { UsersComponent } from './screens/users/users.component';
import { RolesComponent } from './screens/roles/roles.component';
import { PeriodosScreenComponent } from './screens/periodos-screen/periodos-screen.component';
import { ProgramasScreenComponent } from './screens/programas-screen/programas-screen.component';
import { SubmitUserScreenComponent } from './submit-screens/submit-user-screen/submit-user-screen.component';
import { SubmitSolicitudDisenoCursoComponent } from './submit-screens/submit-solicitud-diseno-curso/submit-solicitud-diseno-curso.component';
import { SubmitCarpetaComponent } from './submit-screens/submit-carpeta/submit-carpeta.component';

export const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'users', component:UsersComponent },
  { path:'roles', component:RolesComponent },
  { path:'periodos', component:PeriodosScreenComponent },
  { path:'programas', component:ProgramasScreenComponent },
  { path:'submit-user', component:SubmitUserScreenComponent },
  { path:'submit-solicitud-diseno-curso', component:SubmitSolicitudDisenoCursoComponent },
  { path:'submit-carpeta', component:SubmitCarpetaComponent },
  { path:'', redirectTo:'/login', pathMatch:'full' }
];
