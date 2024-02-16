// Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Types
import { GetValidacionData } from '../../../api/validacion/validacion.types';
import { ValidacionService } from '../../../api/validacion/validacion.service';

@Component({
  selector: 'app-submit-validacion',
  standalone: true,
  imports: [
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

  constructor (private activatedRoute: ActivatedRoute) {}

  getValidationData = injectQuery(() => ({
    queryKey: ['get-validation'],
    queryFn: async () => {
      const result = await this.validationService.getValidacionByProduccionGeneralId(this.currentId);
      this.validacionList = [result.datos];
    }
  }));

}
