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
import { RegisterProduccionGeneralByRowComponent } from '../../../dialogs/submit/register-produccion-general-by-row/register-produccion-general-by-row.component';
import { UploadProduccionGeneralFileDialogComponent } from '../../../dialogs/submit/upload-produccion-general-file-dialog/upload-produccion-general-file-dialog.component';

// Services
import { ProduccionService } from '../../../api/produccion/produccion.service';
import { ModalidadesService } from '../../../api/modalidades/modalidades.service';

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
    CustomBreadcrumbComponent,
    RegisterProduccionGeneralByRowComponent
  ],
  templateUrl: './produccion.component.html',
  styleUrl: './produccion.component.scss'
})
export class ProduccionComponent {

  // Inject
  router = inject(Router);
  modalidadesService = inject(ModalidadesService);
  produccionGeneralService = inject(ProduccionService)

  // Vars
  isDialogOpen = false;
  isProduccionGeneralByRowDialog = false;

  // Static
  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral
  ];

  // Queries
  getProduccionGeneralQuery = injectQuery(() => ({
    queryKey: ['get-produccion-general'],
    queryFn: () => this.produccionGeneralService.getProduccionGeneral(),
  }));

  getModalidadesQuery = injectQuery(() => ({
    queryKey: ['get-modalidades'],
    queryFn: () => this.modalidadesService.getModalidadesApi(),

  }));
  
  // Redirect
  redirectToProductionForm = (id:string) => this.router.navigate([`/submit-produccion-general/${id}`]);

  redirectToSeguimiento = (id:string, idModalidad:string) => this.router.navigate([`/submit-seguimiento/${id}/${idModalidad}`]);

  redirectToValidacion = (id:string) => this.router.navigate([`/submit-validacion/${id}`]);

  redirectToReportes = (id:string) => this.router.navigate([`/submit-reportes/${id}`]);

  // Open Dialog
  toggleIsDialogOpen = () => this.isDialogOpen = !this.isDialogOpen;

  toggleIsProduccionGeneralByRowDialogOpen = () => this.isProduccionGeneralByRowDialog = !this.isProduccionGeneralByRowDialog;

  // Match
  matchModalidad (id:string) {
    const parsedId = parseInt(id);
    const result = this.getModalidadesQuery.data()
    if (!result) return '-';
    return result.modalidades.find((modalidad) => modalidad.id === parsedId)?.nombre || 'NO ESPECIFICADO';
  }

}