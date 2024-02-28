// Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';


import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Services
import { SeguimientoService } from '../../../api/seguimiento/seguimiento.service';

@Component({
  selector: 'app-submit-seguimiento',
  standalone: true,
  imports: [
    CardWithSkeletonComponent,
    NavigationContainerComponent,
    TableModule,
    ButtonModule,
    CustomBreadcrumbComponent
  ],
  templateUrl: './submit-seguimiento.component.html',
  styleUrl: './submit-seguimiento.component.scss'
})
export class SubmitSeguimientoComponent {

  seguimientoService = inject(SeguimientoService);

  currentId = this.activatedRoute.snapshot.params['id'];

  breadcrumbItems = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    { ...BreadcrumbItemsClass.seguimientoItem(this.currentId) }
  ]

  constructor (private activatedRoute: ActivatedRoute,) {}
  
  getSeguimientoWithProduccionQuery = injectQuery(() => ({
    queryKey: ['get-seguimiento-with-produccion'],
    queryFn: () => this.seguimientoService.getSeguimientoList(this.currentId)
  }));

}
