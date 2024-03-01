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

// Helpers
import HandleDates from '../../../helpers/handle-dates';

// Services
import { ProduccionService } from '../../../api/produccion/produccion.service';
import { SeguimientoService } from '../../../api/seguimiento/seguimiento.service';

// Types
import CalculatePorcentajeAvanceHelper, { DataForCalculatePorcentajeAvance } from '../../../helpers/calculate-porcentaje-avance-helper';
import { FormatosService } from '../../../api/formatos/formatos.service';

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

  // Injects
  formatosService = inject(FormatosService);
  produccionService = inject(ProduccionService);
  seguimientoService = inject(SeguimientoService);

  // Vars
  currentId = this.activatedRoute.snapshot.params['id'];
  currentModalidadId  = this.activatedRoute.snapshot.params['idModalidad'];
  porcentajeDates:string[] = [];

  // Breadcrumbs
  breadcrumbItems = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    { ...BreadcrumbItemsClass.seguimientoItem(this.currentId) }
  ]

  constructor (private activatedRoute: ActivatedRoute,) {}

  // Queries
  porcentajesAvanceQuery = injectQuery(() => ({

    queryKey: ['get-porcentajes-avance'],
    
    queryFn: async () => {

      try {

        const result = await this.produccionService.getPorcentajesAvanceByProduccionGeneraApi(this.currentId);

        const porcentajes = CalculatePorcentajeAvanceHelper.getPorcentajesAvanceAndFilterOnePerFormatoPerDate(result.resultado);

        const porcentajesDates = porcentajes.map((item) => item.fecha_inicio.slice(0, 10));

        const uniqueDates = [...new Set(porcentajesDates)];

        const parseDates = uniqueDates.map((date) => HandleDates.parseDateFormat1ToFormat2(date, 'YYYY-MM-DD', 'DD/MM/YYYY'));

        this.porcentajeDates = parseDates;

        return porcentajes;

      } catch (error) {

        return null;

      }
      
    }

  }));

  getSeguimientoWithProduccionQuery = injectQuery(() => ({
    queryKey: ['get-seguimiento-with-produccion'],
    queryFn: () => this.seguimientoService.getSeguimientoList(this.currentId, this.currentModalidadId)
  }));

  getFormatosQuery = injectQuery(() => ({
    queryKey: ['get-formatos'],
    queryFn: () => this.formatosService.getFormatosApi()
  }));

  // Get
  getPorcentajeReal (data:DataForCalculatePorcentajeAvance) {
    return CalculatePorcentajeAvanceHelper.calculatePorcentajeAvance(data)
  }

  getSeguimientoColumns (idFormato:number) {
    const data = this.porcentajesAvanceQuery.data();
    if (!data) return [];
    const rows = data.filter(({ formato }) => idFormato === formato);
    return rows.map(({ porcentaje }) => porcentaje.toFixed(2));
  }

  // Match 
  matchFormatoName (idFormato:number) {
    const data = this.getFormatosQuery.data();
    if (!data) return 'No Especificado';
    const formato = data.formatos.find(({ id }) => id === idFormato);
    return formato ? formato.nombre : 'No Especificado';
  }

}
