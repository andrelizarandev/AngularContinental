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
import { RegisterPeriodoGeneralDialogComponent } from '../../../dialogs/submit/register-periodo-general-dialog/register-periodo-general-dialog.component';
import { UploadProduccionGeneralFileDialogComponent } from '../../../dialogs/submit/upload-produccion-general-file-dialog/upload-produccion-general-file-dialog.component';

// Services
import { ProduccionService } from '../../../api/produccion/produccion.service';

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
    CardWithSkeletonComponent,
    UploadProduccionGeneralFileDialogComponent,
    CustomBreadcrumbComponent
  ],
  templateUrl: './produccion.component.html',
  styleUrl: './produccion.component.scss'
})
export class ProduccionComponent {

  router = inject(Router);
  produccionGeneralService = inject(ProduccionService)

  getProduccionGeneralQuery = injectQuery(() => ({
    queryKey: ['get-produccion-general'],
    queryFn: () => this.produccionGeneralService.getProduccionGeneral(),
  }));

  isDialogOpen = false;

  productionList:GetSolicitudDisenoCursoData[] = [];

  eapList:GetEapData[] = [];

  facultadList:GetFacultadData[] = [];

  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral
  ];
  
  // Redirect
  redirectToProductionForm = (id:string) => this.router.navigate([`/submit-produccion-general/${id}`]);

  redirectToSeguimiento = (id:string) => this.router.navigate([`/submit-seguimiento/${id}`]);

  redirectToValidacion = (id:string) => this.router.navigate([`/submit-validacion/${id}`]);

  // Open Dialog
  toggleIsDialogOpen = () => this.isDialogOpen = !this.isDialogOpen;
  
  // Match
  matchEapName (id:string) {
    return this.eapList.find((eap) => eap.id.toString() === id)?.nombre || 'No Especificado';
  }

  matchFacultadName (id:string) {
    return this.facultadList.find((facultad) => facultad.id.toString() == id)?.nombre || 'No Especificado';
  }

}