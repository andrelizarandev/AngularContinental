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
import HandleDates from '../../../helpers/handle-dates';

// Services
import { ReportesService } from '../../../api/reportes/reportes.service';
import { FormatosService } from '../../../api/formatos/formatos.service';
import { ProduccionService } from '../../../api/produccion/produccion.service';
import { ModalidadesService } from '../../../api/modalidades/modalidades.service';

// Types
import { GetFacultadData, GetMetodoData } from '../../../api/reportes/reportes.types';
import { GetPorcentajesAvanceByProduccionGeneralData } from '../../../api/produccion/produccion.types';
import { OptionDataIdNumber } from '../submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';
import CalculatePorcentajeAvanceHelper, { DataForCalculatePorcentajeAvance } from '../../../helpers/calculate-porcentaje-avance-helper';

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
  produccionGeneralService = inject(ProduccionService);

  // Vars
  facultadesList:GetFacultadData[] = [];
  currentId = this.activatedRoute.snapshot.params['id'];

  // Utils
  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
  textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');

  barColors = [
    this.documentStyle.getPropertyValue('--blue-500'), 
    this.documentStyle.getPropertyValue('--yellow-500'), 
    this.documentStyle.getPropertyValue('--green-500')
  ]

  // Charts
  barData: any;
  barOptions: any;
  pieData: any;
  pieOptions: any;

  // Forms
  filterFormGroup: FormGroup | undefined;

  // Options
  facultadesOptions: OptionDataIdNumber[] | undefined;

  // Static
  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    { ...BreadcrumbItemsClass.registroReportesItem(this.currentId), routerLinkActive: true }
  ];

  constructor (private activatedRoute:ActivatedRoute) {}

  ngOnInit() {

    this.barOptions = {
        plugins: {
            legend: {
                labels: {
                    color: this.textColor
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: this.textColorSecondary
                },
                grid: {
                    color: this.surfaceBorder,
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: this.textColorSecondary
                },
                grid: {
                    color: this.surfaceBorder,
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
            color: this.textColor
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

  // Queries
  getReportesQuery = injectQuery(() => ({
    queryKey: ['get-reportes'],
    queryFn: async () => {
      try {
        const result = await this.reportesService.getReportesApi(this.currentId);
        this.calculatePorcentajeModalidades(result.metodo);
        return result;
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

  getPorcentajesAvanceByProduccionGeneraApi = injectQuery(() => ({

    queryKey:['get-porcentajes-avance-by-produccion-general', this.currentId],

    queryFn: async () => {

      try {

        const result = await this.produccionGeneralService.getPorcentajesAvanceByProduccionGeneraApi(this.currentId);

        const data = result.resultado;

        const dates = data.map((row) => row.fecha_registro.slice(0,10));

        const formatos = data.map((row) => row.formato);

        const nonRepeatedDates = [...new Set(dates)]

        const nonRepeatedFormatos = [...new Set(formatos)];

        const finalResult = CalculatePorcentajeAvanceHelper.getPorcentajesAvanceAndFilterOnePerFormatoPerDate(data);

        const datasets = nonRepeatedFormatos.map((row1, key) => {

          const selectedRows = finalResult.filter((row2) => row2.formato === row1);

          const percentage = selectedRows.map((row2) => row2.porcentaje); 

          return ({
            label:this.matchFormato(row1),
            data:percentage,
            backgroundColor:this.barColors[key], 
          });

        });

        const parsedDates = nonRepeatedDates.map((date) => HandleDates.parseDateFormat1ToFormat2(date, 'YYYY-MM-DD', 'DD/MM/YYYY'));

        this.barData = {
          labels:parsedDates,
          datasets
        };

        return result;

      } catch (err:any) {

        return null
        
      }

    }
    
  }));

  // Getters
  public get produccionGeneralFromReportes () {
    return this.getReportesQuery.data()?.produccion_general || null;
  }

  // Match
  matchIdFacultad (id:string) {
    const parsedId = Number(id);
    const data = this.getFacultadesQuery.data();
    if (!data) return '-';
    return data.find(facultad => facultad.id === parsedId)?.nombre || '-';
  }

  matchModalidad (id:string) {
    const parsedId = parseInt(id);
    const data = this.getModalidadesQuery.data();
    if (!data) return '-';
    return data.modalidades.find(modalidad => modalidad.id === parsedId)?.nombre || '-';
  }

  matchFormato (id:number) {
    const data = this.getFormatosQuery.data();
    if (!data) return '-';
    return data.formatos.find(formato => formato.id === id)?.nombre || '-';
  }

  // Calculate
  calculatePorcentajeReal (id:number) {

    const result = this.getReportesQuery.data()

    if (!result) return null;

    const selectedRow = result.metodo.find(({ id:rowId }) => rowId === id);

    if (!selectedRow) return null;

    const { 
      evaluacion_entrada,
      u1_autoevaluaciones,
      u1_guia,
      hoja_calendario,
      lecturas,
      u1_pa1,
      u1_ppt,
      u1_recurso_innovador
    } = selectedRow;

    const {
      u2_autoevaluaciones,
      u2_guia,
      u2_pa2,
      u2_ppt,
      u2_recurso_innovador
    } = selectedRow;

    const {
      u3_autoevaluaciones,
      u3_guia,
      u3_pa3,
      u3_ppt,
      u3_recurso_innovador
    } = selectedRow;

    const {
      u4_autoevaluaciones,
      u4_guia,
      u4_pa4,
      u4_ppt,
      u4_recurso_innovador
    } = selectedRow;

    const dataForCalculatePorcentajeAvance:DataForCalculatePorcentajeAvance = {

      evaluacion_entrada,
      hoja_calendario,
      lecturas,
      u1_autoevaluaciones,
      u1_ppt,
      u1_guia,
      u1_pa1,
      u1_recurso_innovador,

      u2_autoevaluaciones,
      u2_ppt,
      u2_guia,
      u2_pa2,
      u2_recurso_innovador,

      u3_autoevaluaciones,
      u3_ppt,
      u3_guia,
      u3_pa3,
      u3_recurso_innovador,

      u4_autoevaluaciones,
      u4_ppt,
      u4_guia,
      u4_pa4,
      u4_recurso_innovador,

    }

    return CalculatePorcentajeAvanceHelper.calculatePorcentajeAvance(dataForCalculatePorcentajeAvance);

  }

  calculatePorcentajeModalidades (data:GetMetodoData[]) {

    var totalPresencial = 0;
    var totalSemiprecencial = 0;
    var totalADistancia = 0;

    data.forEach(({ modalidad }) => {
      switch (modalidad) {
        case 1: totalPresencial++;
          break;
        case 2: totalSemiprecencial++;
          break;
        case 3: totalADistancia++;
          break;
        case 4: 
          totalPresencial++;
          totalADistancia++;
          break;  
        case 5:
          totalSemiprecencial++;
          totalADistancia++;
          break;
        case 6:
          totalPresencial++;
          totalSemiprecencial++;
          break;
        case 7:
          totalPresencial++;
          totalSemiprecencial++;
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

    return [];

  }

  getFilteredReportRows () {  
    
    // const codigoFilter = this.filterFormGroup?.value.codigo;

    // const asignaturaFilter = this.filterFormGroup?.value.asignatura;

    // const docenteDisenadorFilter = this.filterFormGroup?.value.docente_disenador;

    // const facultadFilter = this.filterFormGroup?.value.selectedFacultad;

    const result1 = this.getReportesQuery.data();

    if (result1 === null || result1 === undefined || result1.metodo.length === 0) return [];

    const metodos = result1.metodo;

    return metodos;

  }

  getPorcentajeTotal () {
    const result = this.getReportesQuery.data();
    if (!result) return '-';
    const porcentajes = result.metodo.map((row) => this.calculatePorcentajeReal(row.id));
    const notNullPorcentajes = porcentajes.flatMap((porcentaje) => porcentaje ? [porcentaje] : []);
    const notNullPorcentajesLength = notNullPorcentajes.length;
    const total = notNullPorcentajes.reduce((acc, porcentaje) => acc + porcentaje, 0);
    return (total / notNullPorcentajesLength).toFixed(2);
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

}
