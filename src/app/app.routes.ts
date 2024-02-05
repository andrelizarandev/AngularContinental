// Modules
import { Routes } from '@angular/router';

// Screens
import { LoginComponent } from './screens/login/login.component';
import { UsersComponent } from './screens/users/users.component';
import { RolesComponent } from './screens/roles/roles.component';
import { ProduccionComponent } from './screens/produccion/produccion.component';
import { PeriodosScreenComponent } from './screens/periodos-screen/periodos-screen.component';
import { ProgramasScreenComponent } from './screens/programas-screen/programas-screen.component';
import { SubmitUserScreenComponent } from './submit-screens/submit-user-screen/submit-user-screen.component';
import { SolicitudesDisenoCursoComponent } from './screens/solicitudes-diseno-curso/solicitudes-diseno-curso.component';
import { SubmitSolicitudDisenoCursoComponent } from './submit-screens/submit-solicitud-diseno-curso/submit-solicitud-diseno-curso.component';
import { SubmitProduccionGeneralComponent } from './submit-screens/submit-produccion-general/submit-produccion-general.component';

export const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'users', component:UsersComponent },
  { path:'roles', component:RolesComponent },
  { path:'periodos', component:PeriodosScreenComponent },
  { path:'programas', component:ProgramasScreenComponent },
  { path:'submit-user', component:SubmitUserScreenComponent },
  { path:'solicitud-diseno-curso', component:SolicitudesDisenoCursoComponent },
  { path:'produccion', component:ProduccionComponent },
  { path:'submit-solicitud-diseno-curso', component:SubmitSolicitudDisenoCursoComponent },
  { path:'submit-produccion-general', component:SubmitProduccionGeneralComponent },
  { path:'', redirectTo:'/login', pathMatch:'full' }
];
