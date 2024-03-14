// Modules
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { injectQuery } from '@tanstack/angular-query-experimental';
// Classes
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Helpers
import DateHelper from '../../../helpers/date-helper';

// Services
import { ModalidadesService } from '../../../api/modalidades/modalidades.service';
import { ImplementacionService } from '../../../api/implementacion/implementacion.service';

// Types
import { GetImplementacionByIdData } from '../../../api/implementacion/implementacion.types';
import { OptionDataIdNumber } from '../submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';
import { MatchHelper } from '../../../helpers/match-helper';

@Component({
  selector: 'app-submit-implementacion',
  standalone: true,
  imports: [
    TableModule,
    DropdownModule,
    CustomBreadcrumbComponent,
    CardWithSkeletonComponent,
    NavigationContainerComponent,
  ],
  templateUrl: './submit-implementacion.component.html',
  styleUrl: './submit-implementacion.component.scss'
})

export class SubmitImplementacionComponent {

  // Vars
  currentId = this.activatedRoute.snapshot.params['id'];
  implementacionRows:GetImplementacionByIdData[] = [];
  responsableImplementacionOptions:OptionDataIdNumber[] = [
    { id:1, label:'Responsable 1' },
    { id:2, label:'Responsable 2' },
    { id:3, label:'Responsable 3' },
    { id:4, label:'Responsable 4' },
    { id:5, label:'Responsable 5' }
  ];

  // Breadcrumbs
  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    BreadcrumbItemsClass.registroImplementacionItem('id')
  ];

  // Inject
  implementacionService = inject(ImplementacionService);
  modalidadesService = inject(ModalidadesService);

  constructor (private activatedRoute:ActivatedRoute) {}

  // Queries
  getImplementacionByIdQuery = injectQuery(() => ({

    queryKey: ['get-implementacion', this.currentId],

    queryFn: async () => {

      try {

        const response = await this.implementacionService.getImplementacionByIdApi(this.currentId);

        this.implementacionRows = [response];

        return response;

      } catch (error:any) {

        return null;

      }

    }

  }));

  getModalidadesQuery = injectQuery(() => ({

    queryKey: ['get-modalidades'],

    queryFn: async () => this.modalidadesService.getModalidadesApi()
  
  }));

  // Parse
  parseDateYMDtoDMY (date:string) {
    return DateHelper.parseDateFormat1ToFormat2(date, 'YYYY-MM-DD', 'DD/MM/YYYY');
  }

  parseIdModalidad (id:string) {
    return MatchHelper.matchIdWithModalidadData(id, this.getModalidadesQuery.data()?.modalidades || []);
  }

  // Get
  getSilabosByIndex (index:number) {
    const result = this.getImplementacionByIdQuery.data();
    if (!result) return '-'
    return result.silabos[index]?.ruta_archivo || '-';
  }

}
