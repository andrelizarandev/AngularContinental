// Modules
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterPeriodoGeneralDialogComponent } from '../../../dialogs/submit/register-periodo-general-dialog/register-periodo-general-dialog.component';

// Services
import { SolicitudDisenoCursoService } from '../../../api/solicitudes-diseno-curso/diseno-curso.service';

// Types
import { GetEapData, GetFacultadData, GetSolicitudDisenoCursoData } from '../../../api/solicitudes-diseno-curso/diseno-curso.types';

@Component({
  selector: 'app-produccion',
  standalone: true,
  imports: [
    NavigationContainerComponent, 
    ButtonModule, 
    TableModule,
    RegisterPeriodoGeneralDialogComponent,
    CardWithSkeletonComponent
  ],
  templateUrl: './produccion.component.html',
  styleUrl: './produccion.component.scss'
})
export class ProduccionComponent {


  isRegisterOpen = false;
  productionList:GetSolicitudDisenoCursoData[] = [];
  eapList:GetEapData[] = [];
  facultadList:GetFacultadData[] = [];
  
  getSolicitudDisenoCursoListService = inject(SolicitudDisenoCursoService)
    .getDisenoCursoList()
    .result;

  getEapListService = inject(SolicitudDisenoCursoService)
    .getEapList()
    .result$.subscribe((result) => {
      if (result.isSuccess) this.eapList = result.data;
    });

  getFacultadListService = inject(SolicitudDisenoCursoService)
    .getFacultadList()
    .result$.subscribe((result) => {
      if (result.isSuccess) this.facultadList = result.data;
    });

  constructor(private router: Router) {}

  redirectToProductionForm (id:string) {
    this.router.navigate([`/submit-produccion-general/${id}`]);
  }

  matchEapName (id:string) {
    return this.eapList.find((eap) => eap.id.toString() === id)?.nombre || 'No Especificado';
  }

  matchFacultadName (id:string) {
    return this.facultadList.find((facultad) => facultad.id.toString() == id)?.nombre || 'No Especificado';
  }

}