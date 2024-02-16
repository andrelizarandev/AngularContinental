// Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Services
import { SeguimientoService } from '../../../api/seguimiento/seguimiento.service';
import { GetSeguimientoData } from '../../../api/seguimiento/seguimiento.types';

@Component({
  selector: 'app-submit-seguimiento',
  standalone: true,
  imports: [
    CardWithSkeletonComponent,
    NavigationContainerComponent,
    TableModule,
    ButtonModule
  ],
  templateUrl: './submit-seguimiento.component.html',
  styleUrl: './submit-seguimiento.component.scss'
})
export class SubmitSeguimientoComponent {

  seguimientoService = inject(SeguimientoService);

  currentId = this.activatedRoute.snapshot.params['id'];

  seguimientoData:GetSeguimientoData[] = [];

  constructor (
    private activatedRoute: ActivatedRoute,
  ) {}
  
  getSeguimientoWithProduccionQuery = injectQuery(() => ({

    queryKey: ['get-seguimiento-with-produccion'],

    queryFn: async () => {

      const result = await this.seguimientoService.getSeguimientoList(this.currentId);

      this.seguimientoData = [result.seguimiento];

    },

  }));

}
