// Modules
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
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

// Services
import { ReportesService } from '../../../api/reportes/reportes.service';

// Types
import { GetFacultadData, GetPorcentajeRealData } from '../../../api/reportes/reportes.types';
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
    ReactiveFormsModule
  ],
  templateUrl: './submit-reportes.component.html',
  styleUrl: './submit-reportes.component.scss'
})
export class SubmitReportesComponent {

  reportesService = inject(ReportesService);

  currentId = this.activatedRoute.snapshot.params['id'];

  facultadesList:GetFacultadData[] = [];

  constructor (private activatedRoute:ActivatedRoute) {}

  barData: any;

  barOptions: any;

  pieData: any;

  pieOptions: any;

  facultadesOptions: OptionDataIdNumber[] | undefined;

  filterFormGroup: FormGroup | undefined;

  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    { ...BreadcrumbItemsClass.registroReportesItem(this.currentId), routerLinkActive: true }
  ]

  // Queries
  getReportesQuery = injectQuery(() => ({
    queryKey: ['get-reportes'],
    queryFn: async () => {
      try {
        const result = await this.reportesService.getReportesApi(this.currentId);
        return result;
      } catch (err:any) {
        return null;
      }
    }
  }));

  getFacultadesQuery = injectQuery(() => ({
    queryKey: ['get-facultades'],
    queryFn: async () => {
      try {
        const result = await this.reportesService.getFacultadesApi();
        this.facultadesList = result;
        const options:OptionDataIdNumber[] = result.map(({ id, nombre }) => ({ id, label:nombre }));
        this.facultadesOptions = options;
        return result;
      } catch (err:any) {
        return null;
      }
    }
  }));

  getPorcetajeRealQuery = injectQuery(() => ({
    queryKey: ['get-porcentaje-real'],
    queryFn: async () => {
      try {
        const result = await this.reportesService.getPorcentajeRealApi(this.currentId);
        return this.calculatePorcentajeReal(result[0]);
      } catch (err:any) {
        return null;
      }
    }

  }));

  // Match
  matchIdFacultad (id:number) {
    return this.facultadesList.find(facultad => facultad.id === id)?.nombre || 'No Asignado';
  }

  // Calculate
  calculatePorcentajeReal (porcentaje:GetPorcentajeRealData) {

    const { 
      evaluacion_entrada, 
      hoja_calendario, 
      lecturas, 
      u1_guia, 
      u1_autoevaluaciones,
      u1_pa1, 
      u1_ppt, 
      u1_recurso_innovador
    } = porcentaje

    const sum = (evaluacion_entrada + hoja_calendario + lecturas + u1_guia + u1_autoevaluaciones + u1_pa1 + u1_ppt + u1_recurso_innovador);    
    const porcentajeReal = (sum * 25 / 8);

    const {
      u2_autoevaluaciones,
      u2_guia,
      u2_pa2,
      u2_ppt,
      u2_recurso_innovador
    } = porcentaje;

    const sum2 = (u2_autoevaluaciones + u2_guia + u2_pa2 + u2_ppt + u2_recurso_innovador);
    const porcentajeReal2 = (sum2 * 25 / 5);

    const {
      u3_autoevaluaciones,
      u3_guia,
      u3_pa3,
      u3_ppt,
      u3_recurso_innovador
    } = porcentaje;

    const sum3 = (u3_autoevaluaciones + u3_guia + u3_pa3 + u3_ppt + u3_recurso_innovador);
    const porcentajeReal3 = (sum3 * 25 / 5);

    const {
      u4_autoevaluaciones,
      u4_guia,
      u4_pa4,
      u4_ppt,
      u4_recurso_innovador
    } = porcentaje;
    
    const sum4 = (u4_autoevaluaciones + u4_guia + u4_pa4 + u4_ppt + u4_recurso_innovador);
    const porcentajeReal4 = (sum4 * 25 / 5);

    return `${(porcentajeReal + porcentajeReal2 + porcentajeReal3 + porcentajeReal4)}%`;

  }

  ngOnInit() {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');

    this.barData = {
        labels: ['Q1', 'Q2', 'Q3'],
        datasets: [
            {
                label: 'Sales',
                data: [540, 325, 702],
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                borderColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')],
                borderWidth: 1
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

    this.pieData = {
      labels: ['A', 'B', 'C'],
      datasets: [
          {
              data: [540, 325, 702],
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
      ]
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
      selectedFacultad: new FormControl<OptionDataIdNumber | null>(null)
    });

  }

}
