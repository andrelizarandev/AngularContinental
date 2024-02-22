// Modules
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { MessageModule } from 'primeng/message';
import { ActivatedRoute } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

// Classes
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Helpers
import TextHelper from '../../../helpers/text-helpers';
import HandleDates from '../../../helpers/handle-dates';

// Services
import { ReportesService } from '../../../api/reportes/reportes.service';
import { FormatosService } from '../../../api/formatos/formatos.service';

// Types
import { ModalidadesService } from '../../../api/modalidades/modalidades.service';
import { GetFacultadData, GetReportesData } from '../../../api/reportes/reportes.types';
import { OptionDataIdNumber } from '../submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';

@Component({
  selector: 'app-submit-reportes',
  standalone: true,
  imports: [
    NavigationContainerComponent,
    CardWithSkeletonComponent,
    TableModule,
    InputTextModule,
    ChartModule,
    CustomBreadcrumbComponent,
    DropdownModule,
    ReactiveFormsModule,
    MessageModule
  ],
  templateUrl: './submit-reportes.component.html',
  styleUrl: './submit-reportes.component.scss'
})
export class SubmitReportesComponent {

  // Inject
  formatosService = inject(FormatosService);
  reportesService = inject(ReportesService);
  modalidadesService = inject(ModalidadesService);

  // Vars
  facultadesList:GetFacultadData[] = [];
  currentId = this.activatedRoute.snapshot.params['id'];

  documentStyle = getComputedStyle(document.documentElement);

  // Charts
  barData: any;
  barOptions: any;
  pieData: any;
  pieOptions: any;

  // Forms
  filterFormGroup: FormGroup | undefined;

  // Options
  facultadesOptions: OptionDataIdNumber[] | undefined;

  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    { ...BreadcrumbItemsClass.registroReportesItem(this.currentId), routerLinkActive: true }
  ];

  constructor (private activatedRoute:ActivatedRoute) {}

  // Queries
  getReportesQuery = injectQuery(() => ({
    queryKey: ['get-reportes'],
    queryFn: async () => {
      try {
        const result = await this.reportesService.getReportesApi(this.currentId);
        this.calculatePorcentajeModalidades(result.resultado);
        return result.resultado;
      } catch (err:any) {
        return null;
      }
    }
  }));

  getFormatosQuery = injectQuery(() => ({
    queryKey: ['get-formatos'],
    queryFn: () => this.formatosService.getFormatosApi()
  }));

  getFacultadesQuery = injectQuery(() => ({
    queryKey: ['get-facultades'],
    queryFn: () => this.reportesService.getFacultadesApi()
  }));

  getModalidadesQuery = injectQuery(() => ({
    queryKey: ['get-modalidades'],
    queryFn: () => this.modalidadesService.getModalidadesApi()
  }));

  // Match
  matchIdFacultad (id:string) {
    const parsedId = Number(id);
    const data = this.getFacultadesQuery.data();
    if (!data) return '-';
    return data.find(facultad => facultad.id === parsedId)?.nombre || '-';
  }

  matchIdModalidad (id:string) {
    const parsedId = parseInt(id);
    const data = this.getModalidadesQuery.data();
    if (!data) return '-';
    return data.modalidades.find(modalidad => modalidad.id === parsedId)?.nombre || '-';
  }

  matchCurrentFormato (id:number) {
    const result = this.getReportesQuery.data();
  }

  matchFormato (id:number) {
    const data = this.getFormatosQuery.data();
    if (!data) return '-';
    return data.formatos.find(formato => formato.id === id)?.nombre || '-';
  }

  // Calculate
  calculatePorcentajeReal (id:number) {

    const selectedRow = this.getReportesQuery.data()?.find(({ id:currentId }) => currentId === id);

    if (!selectedRow) return '-';

    const { unidades } = selectedRow;

    const { unidad1, unidad2, unidad3, unidad4 } = unidades;

    const { 
      autoevaluaciones,
       guia,
       hoja_calendario,
       lecturas,
       pa,
       ppt,
       recurso_innovador,
    } = unidad1

    const sum = (autoevaluaciones + guia + hoja_calendario + lecturas + pa + ppt + recurso_innovador);  
    const porcentajeReal = (sum * 25 / 8);

    const {
      autoevaluaciones:u2_autoevaluaciones,
      guia:u2_guia,
      pa:u2_pa2,
      ppt:u2_ppt,
      recurso_innovador:u2_recurso_innovador
    } = unidad2;

    const sum2 = (u2_autoevaluaciones + u2_guia + u2_pa2 + u2_ppt + u2_recurso_innovador);
    const porcentajeReal2 = (sum2 * 25 / 5);

    const {
      autoevaluaciones:u3_autoevaluaciones,
      guia:u3_guia,
      pa:u3_pa3,
      ppt:u3_ppt,
      recurso_innovador:u3_recurso_innovador
    } = unidad3;

    const sum3 = (u3_autoevaluaciones + u3_guia + u3_pa3 + u3_ppt + u3_recurso_innovador);
    const porcentajeReal3 = (sum3 * 25 / 5);

    const {
      autoevaluaciones:u4_autoevaluaciones,
      guia:u4_guia,
      pa:u4_pa4,
      ppt:u4_ppt,
      recurso_innovador:u4_recurso_innovador
    } = unidad4;
    
    const sum4 = (u4_autoevaluaciones + u4_guia + u4_pa4 + u4_ppt + u4_recurso_innovador);
    const porcentajeReal4 = (sum4 * 25 / 5);

    return `${(porcentajeReal + porcentajeReal2 + porcentajeReal3 + porcentajeReal4)}%`;

  }

  calculatePorcentajeModalidades (data:GetReportesData[]) {

    var totalPresencial = 0;
    var totalSemiprecencial = 0;
    var totalADistancia = 0;

    data.forEach(({ modalidad }) => {
      switch (modalidad) {
        case '1': totalPresencial++;
          break;
        case '2': totalSemiprecencial++;
          break;
        case '3': totalADistancia++;
          break;
        case'4': 
          totalPresencial++;
          totalADistancia++;
          break;  
      }
    });

    var presencialPorcentaje = (totalPresencial * 100 / data.length);
    var semipresencialPorcentaje = (totalSemiprecencial * 100 / data.length);
    var distanciaPorcentaje = (totalADistancia * 100 / data.length);

    this.pieData = {
      labels: ['Presencial', 'Semipresencial', 'A Distancia'],
      datasets: [
        {
          data: [presencialPorcentaje, semipresencialPorcentaje, distanciaPorcentaje],
          backgroundColor: [
            this.documentStyle.getPropertyValue('--blue-500'), 
            this.documentStyle.getPropertyValue('--yellow-500'), 
            this.documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            this.documentStyle.getPropertyValue('--blue-400'), 
            this.documentStyle.getPropertyValue('--yellow-400'), 
            this.documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    };

  }

  // Get
  getDatesAndTheirPercentage () {

    const data = this.getReportesQuery.data();

    if (!data) return [];

    const rows = data.map(({ fecha_inicio, id }) => {
      const parsedDate = this.parseInitDate(fecha_inicio);
      const porcentajeReal = this.calculatePorcentajeReal(id);
      const parsedPorcentaje = TextHelper.returnJustNumber(porcentajeReal);
      return ({ fecha_inicio:parsedDate, porcentajeReal:parsedPorcentaje });
    });

    return rows;

  }

  // Parse
  parseFacultadesOptions () {
    const result = this.getFacultadesQuery.data();
    if (!result) return [];
    const options:OptionDataIdNumber[] = result.map(({ id, nombre }) => ({ id, label:nombre }));
    return options;
  }

  parseInitDate (date:string) {
    return HandleDates.parseDateFormat1ToFormat2(date, 'YYYY-MM-DD', 'DD/MM/YYYY');
  }

  // Filter
  getFilteredReportRows () {  
    
    const codigoFilter = this.filterFormGroup?.value.codigo;

    const asignaturaFilter = this.filterFormGroup?.value.asignatura;

    const docenteDisenadorFilter = this.filterFormGroup?.value.docente_disenador;

    const facultadFilter = this.filterFormGroup?.value.selectedFacultad;

    const result1 = this.getReportesQuery.data();

    if (result1 === null || result1 === undefined || result1.length === 0) return [];

    const firstFilter = (codigoFilter === '') 
      ? result1 
      : result1.filter(({ codigo }) => codigo.toLowerCase().includes(codigoFilter.toLowerCase()));

    const secondFilter = (asignaturaFilter === '') 
      ? firstFilter 
      : firstFilter.filter(({ asignatura }) => asignatura.toLowerCase().includes(asignaturaFilter.toLowerCase()));

    const thirdFilter = (docenteDisenadorFilter === '') 
      ? secondFilter 
      : secondFilter.filter(({ docente_disenador }) => docente_disenador.toLowerCase().includes(docenteDisenadorFilter.toLowerCase()));

    const fourthFilter = (facultadFilter === null)
      ? thirdFilter
      : thirdFilter.filter(({ facultad }) => Number(facultad) === facultadFilter.id);

    return fourthFilter;

  }

  ngOnInit() {
    
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
    const textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');

    this.barData = {
        labels: ['23/02/2024', '24/02/2024', '25/02/2024', '26/02/2024', '27/02/2024'],
        datasets: [
            {
              label: 'Porcentaje Avance',
              data: [23, 45, 59, 70, 94, 100],
              backgroundColor: [
                this.documentStyle.getPropertyValue('--blue-500'), 
                this.documentStyle.getPropertyValue('--red-500'), 
                this.documentStyle.getPropertyValue('--green-500'),
                this.documentStyle.getPropertyValue('--gray-500'),
                this.documentStyle.getPropertyValue('--yellow-500'),
                this.documentStyle.getPropertyValue('--purple-500')
              ]
            }
        ]
    };

    this.barOptions = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

    this.pieOptions = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };

    this.filterFormGroup = new FormGroup({
      codigo: new FormControl<string>(''),
      asignatura: new FormControl<string>(''),
      docente_disenador: new FormControl<string>(''),
      selectedFacultad: new FormControl<OptionDataIdNumber | null>(null),
    });

  }

}
