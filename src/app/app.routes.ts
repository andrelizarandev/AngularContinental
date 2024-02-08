// Modules
import { Routes } from '@angular/router';

// Screens
import { LoginComponent } from './screens/submit/login-screen/login.component';
import { UsersComponent } from './screens/get/users-screen/users.component';
import { RolesComponent } from './screens/get/roles-screen/roles.component';
import { ProduccionComponent } from './screens/get/produccion-general-screen/produccion.component';
import { PeriodosScreenComponent } from './screens/get/periodos-screen/periodos-screen.component';
import { ProgramasScreenComponent } from './screens/get/programas-screen/programas-screen.component';
import { SubmitUserScreenComponent } from './screens/submit/submit-user-screen/submit-user-screen.component';
import { SolicitudesDisenoCursoComponent } from './screens/get/solicitudes-diseno-curso-screen/solicitudes-diseno-curso.component';
import { SubmitSolicitudDisenoCursoComponent } from './screens/submit/submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';
import { SubmitProduccionGeneralComponent } from './screens/submit/submit-produccion-general-screen/submit-produccion-general.component';

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
