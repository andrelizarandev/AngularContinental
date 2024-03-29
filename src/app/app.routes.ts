// Modules
import { Routes } from '@angular/router';

// Screens
import { HomeComponent } from './screens/get/home/home.component';
import { UsersComponent } from './screens/get/users-screen/users.component';
import { RolesComponent } from './screens/get/roles-screen/roles.component';
import { LoginComponent } from './screens/submit/login-screen/login.component';
import { PeriodosScreenComponent } from './screens/get/periodos-screen/periodos-screen.component';
import { ProduccionComponent } from './screens/get/produccion-general-screen/produccion.component';
import { ProgramasScreenComponent } from './screens/get/programas-screen/programas-screen.component';
import { SubmitReportesComponent } from './screens/submit/submit-reportes/submit-reportes.component';
import { SubmitValidacionComponent } from './screens/submit/submit-validacion/submit-validacion.component';
import { SubmitUserScreenComponent } from './screens/submit/submit-user-screen/submit-user-screen.component';
import { SubmitSeguimientoComponent } from './screens/submit/submit-seguimiento/submit-seguimiento.component';
import { SolicitudesDisenoCursoComponent } from './screens/get/solicitudes-diseno-curso-screen/solicitudes-diseno-curso.component';
import { SubmitProduccionGeneralComponent } from './screens/submit/submit-produccion-general-screen/submit-produccion-general.component';
import { SubmitSolicitudDisenoCursoComponent } from './screens/submit/submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';
import { SubmitProduccionGeneralArchivosScreenComponent } from './screens/submit/submit-produccion-general-archivos-screen/submit-produccion-general-archivos-screen.component';
import { SubmitImplementacionComponent } from './screens/submit/submit-implementacion/submit-implementacion.component';

export const routes: Routes = [
  { path:'', component:LoginComponent },
  { path:'home', component:HomeComponent },
  { path:'users', component:UsersComponent },
  { path:'roles', component:RolesComponent },
  { path:'periodos', component:PeriodosScreenComponent },
  { path:'programas', component:ProgramasScreenComponent },
  { path:'submit-user/:id', component:SubmitUserScreenComponent },
  { path:'solicitud-diseno-curso', component:SolicitudesDisenoCursoComponent },
  { path:'produccion-general', component:ProduccionComponent },
  { path:'submit-solicitud-diseno-curso', component:SubmitSolicitudDisenoCursoComponent },
  { path:'submit-produccion-general/:id', component:SubmitProduccionGeneralComponent },
  { path:'submit-seguimiento/:id/:idModalidad', component:SubmitSeguimientoComponent },
  { path:'submit-validacion/:id', component:SubmitValidacionComponent },
  { path:'submit-reportes/:id', component:SubmitReportesComponent },
  { path:'submit-produccion-general-archivos/:id', component:SubmitProduccionGeneralArchivosScreenComponent },
  { path:'submit-implementacion/:id', component:SubmitImplementacionComponent },
  { path:'', redirectTo:'/login', pathMatch:'full' }
];
