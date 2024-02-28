// Modules
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

// Classes
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Services
import { ValidacionService } from '../../../api/validacion/validacion.service';

// Types
import { GetValidacionData } from '../../../api/validacion/validacion.types';
import { ModalidadesService } from '../../../api/modalidades/modalidades.service';

@Component({
  selector: 'app-submit-validacion',
  standalone: true,
  imports: [
    CustomBreadcrumbComponent,
    CardWithSkeletonComponent,
    NavigationContainerComponent,
    TableModule,
    ButtonModule,
  ],
  templateUrl: './submit-validacion.component.html',
  styleUrl: './submit-validacion.component.scss'
})
export class SubmitValidacionComponent {

  // Injects
  validationService = inject(ValidacionService);
  modalidadService = inject(ModalidadesService);

  currentId = this.activatedRoute.snapshot.params['id'];

  validacionList:GetValidacionData[] = [];

  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    { ...BreadcrumbItemsClass.validacionItem(this.currentId)}
  ]

  constructor (private activatedRoute: ActivatedRoute) {}

  validationQuery = injectQuery(() => ({
    queryKey: ['get-validation'],
    queryFn: async () => {
      const result = await this.validationService.getValidacionByProduccionGeneralId(this.currentId);
      return [result.datos];
    }
  }));

  getModalidadesQuery = injectQuery(() => ({
    queryKey: ['get-modalidades'],
    queryFn: async () => {
      const result = await this.modalidadService.getModalidadesApi();
      return result.modalidades;
    }
  }));

  matchModalidadById (id:string) {
    const modalidadesData = this.getModalidadesQuery.data();
    if (!modalidadesData) return 'No Especificado';
    return modalidadesData.find((modalidad) => String(modalidad.id) === id)?.nombre || 'No Especificado';
  }

  getCurrentFormato (idPresencial:string, idSemipresencial:string, idAdistancia:string) {
    if (idPresencial) return 'Presencial';
    else if (idSemipresencial) return 'Semipresencial';
    else if (idAdistancia) return 'A Distancia';
    else return 'No Especificado';
  }

}
