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

  validationService = inject(ValidacionService);

  currentId = this.activatedRoute.snapshot.params['id'];

  validacionList:GetValidacionData[] = [];

  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    { ...BreadcrumbItemsClass.validacionItem(this.currentId)}
  ]

  constructor (private activatedRoute: ActivatedRoute) {}

  getValidationData = injectQuery(() => ({
    queryKey: ['get-validation'],
    queryFn: async () => {
      const result = await this.validationService.getValidacionByProduccionGeneralId(this.currentId);
      this.validacionList = [result.datos];
    }
  }));

}
